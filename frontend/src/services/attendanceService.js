import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Kept for backward compatibility with any existing callers.
// New code should prefer markAttendance() below, which goes through
// the backend so percentage calculation and analytics stay consistent.
export const saveAttendance = async (attendanceData) => {
  try {
    const docRef = await addDoc(
      collection(db, "attendance"),
      attendanceData
    );

    return {
      success: true,
      id: docRef.id,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error,
    };
  }
};

export const markAttendance = async (payload) => {
  const res = await fetch(`${BASE_URL}/attendance/mark`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const getAttendanceAnalytics = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/attendance/analytics?${params}`);
  return res.json();
};

export const getStudentAttendance = async (studentId) => {
  const res = await fetch(`${BASE_URL}/attendance/student/${studentId}`);
  return res.json();
};

export const listAttendance = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/attendance/list?${params}`);
  return res.json();
};