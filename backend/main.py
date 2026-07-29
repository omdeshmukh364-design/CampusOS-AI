import os
import time
import traceback

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from google import genai

import firebase_admin
from firebase_admin import credentials, firestore

from services.memory_service import memory

from routes.student import router as student_router
from routes.faculty import router as faculty_router
from routes.timetable import router as timetable_router
from routes.attendance import router as attendance_router

# -----------------------------
# Load Environment Variables
# -----------------------------
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

print(
    "API Key Loaded:",
    API_KEY[:10] + "..." if API_KEY else "NOT FOUND"
)

client = genai.Client(api_key=API_KEY) if API_KEY else None


# -----------------------------
# Firebase Initialization
# -----------------------------
if not firebase_admin._apps:
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)

firestore_db = firestore.client()

print("✅ Firebase Admin Connected")


# -----------------------------
# FastAPI
# -----------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(student_router)
app.include_router(faculty_router)
app.include_router(timetable_router)
app.include_router(attendance_router)

# -----------------------------
# Request Model
# -----------------------------
class ChatRequest(BaseModel):
    uid: str
    message: str


def get_user_memories(user_id: str, query: str):
    for attempt in range(3):
        try:
            memories = memory.search(
                query=query,
                version="v2",
                filters={"AND": [{"user_id": user_id}]},
                top_k=30
            )

            # Mem0 has returned both {"results": [...]} and a bare list —
            # check the actual contents, not just dict truthiness.
            if isinstance(memories, dict):
                has_results = bool(memories.get("results"))
            elif isinstance(memories, list):
                has_results = bool(memories)
            else:
                has_results = False

            if has_results:
                return memories
        except Exception as exc:
            print(f"Mem0 search attempt {attempt + 1} failed: {exc}")

        if attempt < 2:
            time.sleep(1)

    return []


# -----------------------------
# Chat Endpoint
# -----------------------------
@app.post("/chat")
def chat(data: ChatRequest):

    if client is None:
        return {
            "error": "Gemini API key is not configured."
        }

    try:

        memory_context = ""

        print("\n========== MEMORY SEARCH ==========")
        print("Searching memory for:", data.uid, flush=True)

        memories = get_user_memories(data.uid, data.message)

        print(memories, flush=True)
        print("===================================\n", flush=True)

        # Mem0's search() has been observed returning either a bare list of
        # memory dicts, OR a dict shaped {"results": [...]}. Handle both so
        # we never silently drop real results again.
        if isinstance(memories, dict):
            memories_list = memories.get("results", [])
        elif isinstance(memories, list):
            memories_list = memories
        else:
            memories_list = []

        # Sort by most recent first so the latest stated fact is listed first,
        # which matters if the same student restates or corrects something.
        memories_sorted = sorted(
            memories_list,
            key=lambda m: m.get("created_at", ""),
            reverse=True,
        )

        for item in memories_sorted:

            if "memory" in item:

                memory_context += (
                    f"- [{item.get('created_at', 'unknown time')}] {item['memory']}\n"
                )

        prompt = f"""
You are CampusOS AI.

Student Memory (most recent first):
{memory_context if memory_context else "(no memories stored yet for this student)"}

Current Question:
{data.message}

Rules:
- You may use facts stated in Student Memory above, AND facts the student just stated in their Current Question below — both are real information you know.
- Never invent, guess, or assume a name, subject, department, or any other personal detail that was not stated in Student Memory or in the Current Question.
- If asked about a fact that appears in neither Student Memory nor the Current Question, say honestly that you don't have that information yet and ask the student to share it. Do not say "according to your profile" unless the fact is literally present in Student Memory.
- Student Memory may contain plain questions the student previously asked (e.g. "what is my name") — these are NOT facts about the student. Ignore entries that are themselves questions; only treat statements as facts.
- If Student Memory contains multiple conflicting values for the same fact (e.g. two different names), trust only the most recent one (memories are listed most recent first) and ignore the older, outdated value.
- Acknowledge and respond warmly to whatever the student just told you in the Current Question, even if it's not yet saved to memory.
- Answer naturally and conversationally, but never fabricate personal facts.
"""
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
        )

        print("\n========== MEMORY SAVE ==========")

        # Don't store questions as memories. A message like "what's my name?"
        # is a query about the student, not a fact about them — but Mem0's
        # semantic search was matching it against other stored questions
        # ("WHAT IS MY NAME", "WHATS MY NAME", etc.) more strongly than
        # against the actual stored answer, crowding the real fact out of
        # the top results entirely. Only save statements.
        message_stripped = data.message.strip()
        question_starters = (
            "what", "who", "when", "where", "why", "how",
            "is my", "are my", "do you know", "tell me my", "can you tell",
        )
        looks_like_question = (
            message_stripped.endswith("?")
            or message_stripped.lower().startswith(question_starters)
        )

        if looks_like_question:
            print("Skipping save — message looks like a question, not a fact.", flush=True)
            save_result = {"skipped": True, "reason": "question, not a statement"}
        else:
            print("Saving memory...", flush=True)
            save_result = memory.add(
                messages=[
                    {
                        "role": "user",
                        "content": data.message,
                    },
                ],
                user_id=data.uid,
                infer=False,
            )

        print(save_result, flush=True)
        print("=================================\n", flush=True)

        return {
            "reply": response.text
        }

    except Exception as e:
        traceback.print_exc()

        return {
            "error": str(e)
        }


# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
def home():

    return {
        "message": "CampusOS AI Backend Running 🚀"
    }