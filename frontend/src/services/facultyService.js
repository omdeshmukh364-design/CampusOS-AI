import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase";

// Firestore Collection
const facultyCollection = collection(db, "faculty");

// =======================
// Add Faculty
// =======================
export const addFaculty = async (faculty) => {
  try {
    // Check duplicate email
    const emailQuery = query(
      facultyCollection,
      where("email", "==", faculty.email.trim().toLowerCase())
    );

    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      throw new Error("Faculty with this email already exists.");
    }

    // Check duplicate Employee ID
    const empQuery = query(
      facultyCollection,
      where("employeeId", "==", faculty.employeeId.trim())
    );

    const empSnapshot = await getDocs(empQuery);

    if (!empSnapshot.empty) {
      throw new Error("Employee ID already exists.");
    }

    const docRef = await addDoc(facultyCollection, {
      name: faculty.name.trim(),
      email: faculty.email.trim().toLowerCase(),
      employeeId: faculty.employeeId.trim(),
      department: faculty.department.trim(),
      designation: faculty.designation.trim(),
      phone: faculty.phone,
      experience: Number(faculty.experience),
      subjects: faculty.subjects,
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// =======================
// Get Faculty
// =======================
export const getFaculty = async () => {
  try {
    const snapshot = await getDocs(facultyCollection);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

// =======================
// Update Faculty
// =======================
export const updateFaculty = async (id, data) => {
  try {
    const ref = doc(db, "faculty", id);

    await updateDoc(ref, {
      ...data,
      experience: Number(data.experience),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// =======================
// Delete Faculty
// =======================
export const deleteFaculty = async (id) => {
  try {
    const ref = doc(db, "faculty", id);

    await deleteDoc(ref);
  } catch (error) {
    console.error(error);
    throw error;
  }
};