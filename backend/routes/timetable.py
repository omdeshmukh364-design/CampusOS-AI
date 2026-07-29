from fastapi import APIRouter, HTTPException
from datetime import datetime
from typing import Optional

from firebase.firebase_config import db
from models.timetable import TimetableCreate, TimetableUpdate

router = APIRouter(prefix="/timetable", tags=["Timetable"])


def _to_minutes(t: str) -> int:
    h, m = t.split(":")
    return int(h) * 60 + int(m)


def _overlaps(start_a: str, end_a: str, start_b: str, end_b: str) -> bool:
    return _to_minutes(start_a) < _to_minutes(end_b) and _to_minutes(end_a) > _to_minutes(start_b)


def _find_conflicts(day, start_time, end_time, room, faculty_id, exclude_id=None):
    """
    Room conflict: same day + same room + overlapping time.
    Faculty conflict: same day + same faculty + overlapping time.
    Two separate .where(day==) queries kept simple (equality-only filters
    don't need a composite index in Firestore). If Firestore's console
    prompts you to create one anyway, just click the link it gives you.
    """
    conflicts = []
    docs = db.collection("timetable").where("day", "==", day).stream()

    for doc in docs:
        if exclude_id and doc.id == exclude_id:
            continue

        data = doc.to_dict()

        if not _overlaps(start_time, end_time, data["startTime"], data["endTime"]):
            continue

        if data.get("room") == room:
            conflicts.append({"type": "room", "id": doc.id, **data})

        if data.get("facultyId") == faculty_id:
            conflicts.append({"type": "faculty", "id": doc.id, **data})

    return conflicts


@router.get("/list")
def list_timetable(
    department: Optional[str] = None,
    semester: Optional[int] = None,
    division: Optional[str] = None,
):
    query = db.collection("timetable")

    if department:
        query = query.where("department", "==", department)
    if semester is not None:
        query = query.where("semester", "==", semester)
    if division:
        query = query.where("division", "==", division)

    docs = query.stream()
    return [{"id": doc.id, **doc.to_dict()} for doc in docs]


@router.post("/create")
def create_lecture(lecture: TimetableCreate):
    conflicts = _find_conflicts(
        lecture.day, lecture.startTime, lecture.endTime,
        lecture.room, lecture.facultyId,
    )

    if conflicts:
        raise HTTPException(
            status_code=409,
            detail={"message": "Scheduling conflict detected", "conflicts": conflicts},
        )

    data = lecture.dict()
    data["createdAt"] = datetime.utcnow().isoformat()

    doc_ref = db.collection("timetable").document()
    doc_ref.set(data)

    return {"success": True, "id": doc_ref.id}


@router.put("/{lecture_id}")
def update_lecture(lecture_id: str, lecture: TimetableUpdate):
    doc_ref = db.collection("timetable").document(lecture_id)
    existing = doc_ref.get()

    if not existing.exists:
        raise HTTPException(status_code=404, detail="Lecture not found")

    updates = {k: v for k, v in lecture.dict().items() if v is not None}
    merged = {**existing.to_dict(), **updates}

    conflicts = _find_conflicts(
        merged["day"], merged["startTime"], merged["endTime"],
        merged["room"], merged["facultyId"], exclude_id=lecture_id,
    )

    if conflicts:
        raise HTTPException(
            status_code=409,
            detail={"message": "Scheduling conflict detected", "conflicts": conflicts},
        )

    doc_ref.update(updates)
    return {"success": True}


@router.delete("/{lecture_id}")
def delete_lecture(lecture_id: str):
    db.collection("timetable").document(lecture_id).delete()
    return {"success": True}


@router.post("/check-conflict")
def check_conflict(lecture: TimetableCreate):
    conflicts = _find_conflicts(
        lecture.day, lecture.startTime, lecture.endTime,
        lecture.room, lecture.facultyId,
    )
    return {"hasConflict": len(conflicts) > 0, "conflicts": conflicts}