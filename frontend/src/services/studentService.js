import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getStudent = async (rollNo) => {
  const docRef = doc(db, "students", rollNo);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
};
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";


// Firestore Collection
const studentCollection = collection(db, "students");

// =======================
// Add Student
// =======================
export const addStudent = async (student) => {
  try {
    // Check duplicate email
    const emailQuery = query(
      studentCollection,
      where("email", "==", student.email.trim().toLowerCase())
    );

    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      throw new Error("Student with this email already exists.");
    }

    // Check duplicate Roll Number
    const rollQuery = query(
      studentCollection,
      where("rollNo", "==", Number(student.rollNo))
    );

    const rollSnapshot = await getDocs(rollQuery);

    if (!rollSnapshot.empty) {
      throw new Error("Roll Number already exists.");
    }

    // Save Student
    const docRef = await addDoc(studentCollection, {
      name: student.name.trim(),
      email: student.email.trim().toLowerCase(),
      rollNo: Number(student.rollNo),
      department: student.department.trim(),
      semester: Number(student.semester),
      phone: student.phone,
      cgpa: Number(student.cgpa),
      attendance: Number(student.attendance),
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// =======================
// Get Students
// =======================
export const getStudents = async () => {
  try {
    const snapshot = await getDocs(studentCollection);

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
// Update Student
// =======================
export const updateStudent = async (id, data) => {
  try {
    const ref = doc(db, "students", id);

    await updateDoc(ref, {
      ...data,
      rollNo: Number(data.rollNo),
      semester: Number(data.semester),
      cgpa: Number(data.cgpa),
      attendance: Number(data.attendance),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// =======================
// Delete Student
// =======================
export const deleteStudent = async (id) => {
  try {
    const ref = doc(db, "students", id);

    await deleteDoc(ref);
  } catch (error) {
    console.error(error);
    throw error;
  }
};