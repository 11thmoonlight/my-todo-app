import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

export const createList = async (userId, listData) => {
  const ref = collection(db, "users", userId, "lists");
  await addDoc(ref, listData);
};

export const getLists = async (userId) => {
  const snapshot = await getDocs(collection(db, "users", userId, "lists"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateList = async (userId, listId, newData) => {
  const listRef = doc(db, "users", userId, "lists", listId);
  await updateDoc(listRef, newData);
};

export const deleteList = async (userId, listId) => {
  const listRef = doc(db, "users", userId, "lists", listId);
  await deleteDoc(listRef);
};

export const listenToLists = (userId, callback) => {
  const ref = collection(db, "users", userId, "lists");
  const unsubscribe = onSnapshot(ref, (snapshot) => {
    const lists = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(lists);
  });
  return unsubscribe;
};
