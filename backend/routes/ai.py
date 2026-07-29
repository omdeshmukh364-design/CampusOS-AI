import os
import time
import traceback

from fastapi import APIRouter
from pydantic import BaseModel

from google import genai

from services.memory_service import memory

router = APIRouter(prefix="/ai")

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
    # MemoryClient (hosted Mem0) returns a plain list of memory dicts,
    # e.g. [{"memory": "Name is Mayur", ...}, ...] — not {"results": [...]}
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
# AI Chat Endpoint (mounted at /ai/chat)
# -----------------------------
@router.post("/chat")
def ai_chat(data: ChatRequest):

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