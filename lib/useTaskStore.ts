import { create } from "zustand";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  unsubscribe: null,

  listenToTasks: (userId: string) => {
    const ref = collection(db, "users", userId, "tasks");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        set({ tasks, error: null });
      },
      (error) => {
        set({ error: error.message });
      }
    );

    set({ unsubscribe });
  },

  stopListening: () => {
    const unsub = get().unsubscribe;
    if (unsub) {
      unsub();
      set({ unsubscribe: null, tasks: [] });
    }
  },

  createTask: async (userId, taskData) => {
    set({ loading: true, error: null });
    try {
      const ref = collection(db, "users", userId, "tasks");
      await addDoc(ref, taskData);
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateTask: async (userId, taskId, newData) => {
    set({ loading: true, error: null });
    try {
      const taskRef = doc(db, "users", userId, "tasks", taskId);
      await updateDoc(taskRef, newData);
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteTask: async (userId, taskId) => {
    set({ loading: true, error: null });
    try {
      const taskRef = doc(db, "users", userId, "tasks", taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
