import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const createTag = async (userId, tagData) => {
  const ref = collection(db, "users", userId, "tags");
  await addDoc(ref, tagData);
};

export const getTags = async (userId) => {
  const snapshot = await getDocs(collection(db, "users", userId, "tags"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateTag = async (userId, tagId, newData) => {
  const tagRef = doc(db, "users", userId, "tags", tagId);
  await updateDoc(tagRef, newData);
};

export const deleteTag = async (userId, tagId) => {
  const tagRef = doc(db, "users", userId, "tags", tagId);
  await deleteDoc(tagRef);
};
