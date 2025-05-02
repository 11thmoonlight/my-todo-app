import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const createStikies = async (userId, stickyData) => {
  const ref = collection(db, "users", userId, "stickies");
  await addDoc(ref, stickyData);
};

export const getStickies = async (userId) => {
  const snapshot = await getDocs(collection(db, "users", userId, "stickies"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateSticky = async (userId, stickyId, newData) => {
  await updateDoc(doc(db, "users", userId, "stickies", stickyId), newData);
};

export const deleteSticky = async (userId, stickyId) => {
  await deleteDoc(doc(db, "users", userId, "stickies", stickyId));
};
