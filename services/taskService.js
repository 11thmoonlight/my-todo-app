import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const createTask = async (userId, taskData) => {
  const ref = collection(db, "users", userId, "tasks");
  await addDoc(ref, taskData);
};

export const getTasks = async (userId) => {
  const snapshot = await getDocs(collection(db, "users", userId, "tasks"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateTask = async (userId, taskId, newData) => {
  await updateDoc(doc(db, "users", userId, "tasks", taskId), newData);
};

export const deleteTask = async (userId, taskId) => {
  await deleteDoc(doc(db, "users", userId, "tasks", taskId));
};
