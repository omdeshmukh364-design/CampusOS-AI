from fastapi import APIRouter

router = APIRouter(prefix="/faculty")

@router.get("/insights")
async def get_insights(facultyId: str):
    return {
        "students": 126,
        "attendance": 92,
        "assignments": 8,
        "subjects": 5,
    }