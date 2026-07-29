const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const getTimetable = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/timetable/list?${params}`);
  return res.json();
};

export const createLecture = async (lecture) => {
  const res = await fetch(`${BASE_URL}/timetable/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lecture),
  });

  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
};

export const updateLecture = async (id, updates) => {
  const res = await fetch(`${BASE_URL}/timetable/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
};

export const deleteLecture = async (id) => {
  const res = await fetch(`${BASE_URL}/timetable/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const checkConflict = async (lecture) => {
  const res = await fetch(`${BASE_URL}/timetable/check-conflict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lecture),
  });
  return res.json();
};