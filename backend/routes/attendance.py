from fastapi import APIRouter
from collections import defaultdict
from typing import Optional

from firebase.firebase_config import db
from models.attendance import AttendanceCreate

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/mark")
def mark_attendance(payload: AttendanceCreate):
    records = [r.dict() for r in payload.records]
    present_count = sum(1 for r in records if r["status"] == "present")
    total_count = len(records)
    percentage = round((present_count / total_count) * 100, 2) if total_count else 0

    data = payload.dict()
    data["records"] = records
    data["presentCount"] = present_count
    data["totalCount"] = total_count
    data["percentage"] = percentage

    doc_ref = db.collection("attendance").document()
    doc_ref.set(data)

    return {"success": True, "id": doc_ref.id, "percentage": percentage}


@router.get("/analytics")
def get_analytics(
    department: Optional[str] = None,
    semester: Optional[int] = None,
    fromDate: Optional[str] = None,
    toDate: Optional[str] = None,
):
    """
    Aggregates every attendance session matching the filters into:
    overall %, per-subject %, per-division %, a date trend, and a
    below-75% student list. Fine at current scale (reads all matching
    session docs); if this collection grows large, move to a
    denormalized `student_attendance_summary` doc updated on each
    /mark call instead of aggregating on read.
    """
    query = db.collection("attendance")

    if department:
        query = query.where("department", "==", department)
    if semester is not None:
        query = query.where("semester", "==", semester)

    docs = list(query.stream())

    sessions = []
    for doc in docs:
        data = doc.to_dict()
        if fromDate and data.get("date", "") < fromDate:
            continue
        if toDate and data.get("date", "") > toDate:
            continue
        sessions.append(data)

    if not sessions:
        return {
            "overallPercentage": 0,
            "totalSessions": 0,
            "bySubject": [],
            "byDivision": [],
            "trend": [],
            "lowAttendanceStudents": [],
        }

    total_present = sum(s["presentCount"] for s in sessions)
    total_marked = sum(s["totalCount"] for s in sessions)
    overall_percentage = round((total_present / total_marked) * 100, 2) if total_marked else 0

    subject_stats = defaultdict(lambda: {"present": 0, "total": 0})
    division_stats = defaultdict(lambda: {"present": 0, "total": 0})
    date_stats = defaultdict(lambda: {"present": 0, "total": 0})
    student_stats = defaultdict(lambda: {"present": 0, "total": 0, "name": ""})

    for s in sessions:
        subject_stats[s["subject"]]["present"] += s["presentCount"]
        subject_stats[s["subject"]]["total"] += s["totalCount"]

        division_stats[s["division"]]["present"] += s["presentCount"]
        division_stats[s["division"]]["total"] += s["totalCount"]

        date_stats[s["date"]]["present"] += s["presentCount"]
        date_stats[s["date"]]["total"] += s["totalCount"]

        for r in s.get("records", []):
            key = r["studentId"]
            student_stats[key]["name"] = r["name"]
            student_stats[key]["total"] += 1
            if r["status"] == "present":
                student_stats[key]["present"] += 1

    def pct(stats):
        return round((stats["present"] / stats["total"]) * 100, 2) if stats["total"] else 0

    by_subject = [
        {"subject": k, "percentage": pct(v), "sessions": v["total"]}
        for k, v in subject_stats.items()
    ]

    by_division = [
        {"division": k, "percentage": pct(v)}
        for k, v in division_stats.items()
    ]

    trend = sorted(
        [{"date": k, "percentage": pct(v)} for k, v in date_stats.items()],
        key=lambda x: x["date"],
    )

    low_attendance_students = sorted(
        [
            {"studentId": k, "name": v["name"], "percentage": pct(v)}
            for k, v in student_stats.items()
            if pct(v) < 75
        ],
        key=lambda x: x["percentage"],
    )

    return {
        "overallPercentage": overall_percentage,
        "totalSessions": len(sessions),
        "bySubject": by_subject,
        "byDivision": by_division,
        "trend": trend,
        "lowAttendanceStudents": low_attendance_students,
    }


@router.get("/list")
def list_attendance(
    department: Optional[str] = None,
    division: Optional[str] = None,
    limit: int = 50,
):
    query = db.collection("attendance")

    if department:
        query = query.where("department", "==", department)
    if division:
        query = query.where("division", "==", division)

    docs = query.limit(limit).stream()
    return [{"id": doc.id, **doc.to_dict()} for doc in docs]


@router.get("/student/{student_id}")
def get_student_attendance(student_id: str):
    """
    Scans every attendance session and totals up this one student's
    present/total count from each session's `records` array. Fine at
    current scale; if this collection grows large, maintain a running
    per-student summary doc instead of scanning on every dashboard load.
    """
    docs = db.collection("attendance").stream()

    present = 0
    total = 0
    subject_breakdown = {}

    for doc in docs:
        data = doc.to_dict()
        for record in data.get("records", []):
            if record.get("studentId") != student_id:
                continue

            total += 1
            subject = data.get("subject", "Unknown")
            subject_breakdown.setdefault(subject, {"present": 0, "total": 0})
            subject_breakdown[subject]["total"] += 1

            if record.get("status") == "present":
                present += 1
                subject_breakdown[subject]["present"] += 1

    percentage = round((present / total) * 100, 2) if total else 0

    by_subject = [
        {
            "subject": s,
            "percentage": round((v["present"] / v["total"]) * 100, 2) if v["total"] else 0,
        }
        for s, v in subject_breakdown.items()
    ]

    return {
        "percentage": percentage,
        "presentCount": present,
        "totalCount": total,
        "bySubject": by_subject,
    }