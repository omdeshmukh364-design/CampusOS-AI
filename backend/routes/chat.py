import os
import time
import traceback

from fastapi import APIRouter
from pydantic import BaseModel

from google import genai

from services.memory_service import memory

router = APIRouter()

# -----------------------------
# Gemini Client
# -----------------------------
API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=API_KEY) if API_KEY else None


# -----------------------------
# Request Model
# -----------------------------
class ChatRequest(BaseModel):
    uid: str
    message: str


# -----------------------------
# Memory Search Helper
# -----------------------------
def get_user_memories(user_id: str, query: str):
    """
    NOTE: memory_service.py uses Mem0's hosted MemoryClient, which returns
    search() results as a plain list of memory dicts, e.g.:
        [{"id": "...", "memory": "Name is Mayur", "user_id": "...", ...}, ...]
    This is NOT the same shape as the OSS Memory().search() call, which
    returns {"results": [...]}. Treating a list like a dict here was the
    root cause of memories never being found.
    """
    for attempt in range(3):
        try:
            memories = memory.search(
                query=query,
                user_id=user_id
            )
            if memories:
                return memories
        except Exception as exc:
            print(f"Mem0 search attempt {attempt + 1} failed: {exc}")

        if attempt < 2:
            time.sleep(1)

    return []


# -----------------------------
# Chat Endpoint
# -----------------------------
@router.post("/chat")
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

        # memories is a list of dicts, e.g. [{"memory": "Name is Mayur", ...}, ...]
        for item in memories:
            if "memory" in item:
                memory_context += f"- {item['memory']}\n"

        prompt = f"""
You are CampusOS AI.

Student Memory:
{memory_context}

Current Question:
{data.message}

Answer naturally.

Use the student's memory whenever it is relevant.
"""
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
        )

        print("\n========== MEMORY SAVE ==========")
        print("Saving memory...", flush=True)

        save_result = memory.add(
            messages=[
                {
                    "role": "user",
                    "content": data.message,
                },
                {
                    "role": "assistant",
                    "content": response.text,
                },
            ],
            user_id=data.uid,
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
