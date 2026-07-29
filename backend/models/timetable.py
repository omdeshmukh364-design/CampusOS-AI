from pydantic import BaseModel
from typing import Optional


class TimetableCreate(BaseModel):
    day: str
    startTime: str          # "HH:MM", 24-hour
    endTime: str             # "HH:MM", 24-hour
    subject: str
    department: str
    semester: int
    division: str
    facultyId: str
    facultyName: str
    room: str


class TimetableUpdate(BaseModel):
    day: Optional[str] = None
    startTime: Optional[str] = None
    endTime: Optional[str] = None
    subject: Optional[str] = None
    department: Optional[str] = None
    semester: Optional[int] = None
    division: Optional[str] = None
    facultyId: Optional[str] = None
    facultyName: Optional[str] = None
    room: Optional[str] = None