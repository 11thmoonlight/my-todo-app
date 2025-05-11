// import { create } from "zustand";
// import { db } from "@/lib/firebase";
// import { collection, onSnapshot } from "firebase/firestore";

// export const useTaskStore = create((set, get) => ({
//   tasks: [],
//   loading: false,
//   error: null,
//   unsubscribe: null,

//   listenToTasks: (userId: string) => {
//     const ref = collection(db, "users", userId, "tasks");

//     const unsubscribe = onSnapshot(
//       ref,
//       (snapshot) => {
//         const tasks = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         set({ tasks, error: null });
//       },
//       (error) => {
//         set({ error: error.message });
//       }
//     );

//     set({ unsubscribe });
//   },

//   stopListening: () => {
//     const unsub = get().unsubscribe;
//     if (unsub) {
//       unsub();
//       set({ unsubscribe: null, tasks: [] });
//     }
//   },
// }));

import { create } from "zustand";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  unsubscribe: (() => void) | null;
  listenToTasks: (userId: string) => void;
  stopListening: () => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  unsubscribe: null,

  listenToTasks: (userId: string) => {
    const ref = collection(db, "users", userId, "tasks");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const tasks: Task[] = snapshot.docs.map((doc: DocumentData) => ({
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
}));
