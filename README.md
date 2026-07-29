# CampusOS AI

CampusOS AI is a full-stack campus assistant built with React and Vite on the frontend, and FastAPI on the backend. It provides student, faculty, and admin experiences with attendance, assignments, study planning, placements, and an AI assistant.

## Project Overview

This project includes:

- A React-based web app for students, faculty, and administrators
- A FastAPI backend for authentication-related routes and AI chat features
- Firebase integration for app data and authentication workflows
- Gemini AI and Mem0-powered memory support for the assistant experience

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: FastAPI, Python, Firebase Admin SDK
- AI: Google Gemini, Mem0

## Prerequisites

Make sure you have:

- Node.js 18+ and npm
- Python 3.10+
- A Firebase service account file named serviceAccountKey.json in the backend folder
- API keys for Gemini and Mem0

## Frontend Setup

From the project root:

```bash
cd frontend
npm install
npm run dev
```

The frontend will usually run at:

- http://localhost:5173

## Backend Setup

From the project root:

```bash
cd backend
pip install -r requirements.txt
```

If your environment does not already include the required packages, install them manually:

```bash
pip install fastapi uvicorn python-dotenv google-genai firebase-admin mem0
```

Create a .env file inside the backend folder with:

```env
GEMINI_API_KEY=your_gemini_key
MEM0_API_KEY=your_mem0_key
```

Start the backend server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at:

- http://localhost:8000/
- http://localhost:8000/chat

## Project Structure

- frontend/: React and Vite app
- backend/: FastAPI server, routes, services, and Firebase configuration
- backend/routes/: API routes for student, faculty, and AI functionality
- backend/services/: memory and assistant-related services

## Notes

- The backend expects Firebase credentials in backend/serviceAccountKey.json.
- The AI assistant depends on the Gemini API and Mem0 memory integration being configured correctly.
- If the frontend is calling the backend, ensure the backend is running before using AI features.
