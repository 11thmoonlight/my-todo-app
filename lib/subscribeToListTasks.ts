import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function subscribeToListTasks(
  userId: string,
  listTitle: string,
  onUpdate: (tasks: Task[]) => void
) {
  const tasksRef = collection(db, "users", userId, "tasks");

  const listTasksQuery = query(tasksRef, where("list.title", "==", listTitle));

  const unsubscribe = onSnapshot(listTasksQuery, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
    onUpdate(tasks);
  });

  return unsubscribe;
}
