from fastapi import APIRouter

router = APIRouter(prefix="/faculty", tags=["Faculty"])


@router.get("/insights")
async def get_faculty_insights(facultyId: str):
    return {
        "attendance": 92,
        "avgMarks": 81,
        "pendingGrading": 14,
        "todayClasses": 4,
        "summary": [
            "2 students are below attendance threshold.",
            "14 assignments require grading.",
            "AI Lab starts at 2 PM."
        ],
        "alerts": [
            {
                "type": "danger",
                "message": "Rahul Patil attendance below 75%"
            },
            {
                "type": "warning",
                "message": "14 assignments pending grading"
            }
        ],
        "timetable": [
            {
                "subject": "Java Programming",
                "time": "9:00 AM",
                "room": "Lab 402"
            },
            {
                "subject": "DBMS",
                "time": "11:00 AM",
                "room": "Room 301"
            }
        ]
    }