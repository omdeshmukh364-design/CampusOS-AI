from pydantic import BaseModel, EmailStr
from typing import Optional


class StudentCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    rollNo: int
    department: str
    semester: int
    division: Optional[str] = None   # e.g. "SY AIML A" — optional so existing students without it still work
    phone: str
    cgpa: float
    attendance: int