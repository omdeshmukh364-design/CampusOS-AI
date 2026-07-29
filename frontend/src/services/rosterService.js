const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getStudents = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/student/list?${params}`);
  return res.json();
};