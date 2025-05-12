import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function subscribeToTagTasks(
  userId: string,
  tagTitle: string,
  onUpdate: (tasks: Task[]) => void
) {
  const tasksRef = collection(db, "users", userId, "tasks");

  const tagTasksQuery = query(tasksRef, where("tag.title", "==", tagTitle));

  const unsubscribe = onSnapshot(tagTasksQuery, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
    onUpdate(tasks);
  });

  return unsubscribe;
}
