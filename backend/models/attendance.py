from pydantic import BaseModel
from typing import List, Optional


class AttendanceRecord(BaseModel):
    studentId: str
    name: str
    rollNo: Optional[int] = None
    status: str  # "present" | "absent"


class AttendanceCreate(BaseModel):
    date: str        # "YYYY-MM-DD"
    day: str
    subject: str
    department: str
    semester: int
    division: str
    facultyId: str
    facultyName: str
    room: str
    records: List[AttendanceRecord]