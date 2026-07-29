import os
import requests

from fastapi import APIRouter
from pydantic import BaseModel

from firebase.firebase_config import db, firebase_auth

router = APIRouter(prefix="/auth")

# Firebase Web API Key (different from your service account file).
# Get it from: Firebase Console > Project Settings > General > Web API Key
# Add it to backend/.env as: FIREBASE_API_KEY=your_key_here
FIREBASE_API_KEY = os.getenv("FIREBASE_API_KEY")


# -----------------------------
# Request Models
# -----------------------------
class SignupRequest(BaseModel):
    email: str
    password: str
    name: str
    role: str = "student"  # student | faculty | admin


class LoginRequest(BaseModel):
    email: str
    password: str


# -----------------------------
# Signup
# -----------------------------
@router.post("/signup")
def signup(data: SignupRequest):
    try:
        user = firebase_auth.create_user(
            email=data.email,
            password=data.password,
            display_name=data.name,
        )

        db.collection("users").document(user.uid).set({
            "uid": user.uid,
            "name": data.name,
            "email": data.email,
            "role": data.role,
        })

        return {
            "uid": user.uid,
            "email": data.email,
            "name": data.name,
            "role": data.role,
        }

    except firebase_auth.EmailAlreadyExistsError:
        return {"error": "An account with this email already exists."}
    except Exception as e:
        return {"error": str(e)}


# -----------------------------
# Login
# -----------------------------
@router.post("/login")
def login(data: LoginRequest):
    if not FIREBASE_API_KEY:
        return {"error": "FIREBASE_API_KEY is not configured in .env"}

    try:
        url = (
            "https://identitytoolkit.googleapis.com/v1/accounts:"
            f"signInWithPassword?key={FIREBASE_API_KEY}"
        )
        payload = {
            "email": data.email,
            "password": data.password,
            "returnSecureToken": True,
        }

        resp = requests.post(url, json=payload)
        result = resp.json()

        if "error" in result:
            return {"error": result["error"]["message"]}

        uid = result["localId"]

        user_doc = db.collection("users").document(uid).get()
        profile = user_doc.to_dict() if user_doc.exists else {}

        return {
            "uid": uid,
            "idToken": result["idToken"],
            "email": result["email"],
            **profile,
        }

    except Exception as e:
        return {"error": str(e)}