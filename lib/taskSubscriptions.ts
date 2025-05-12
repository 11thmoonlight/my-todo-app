import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

export function subscribeToCategorizedTasks(
  userId: string,
  onUpdate: (tasks: {
    todayTasks: Task[];
    tomorrowTasks: Task[];
    thisWeekTasks: Task[];
  }) => void
) {
  const tasksRef = collection(db, "users", userId, "tasks");

  const today = new Date();
  const todayStr = formatDate(today);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = formatDate(tomorrow);

  const weekDates: string[] = [];
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    weekDates.push(formatDate(d));
  }

  const todayQ = query(tasksRef, where("date", "==", todayStr));
  const tomorrowQ = query(tasksRef, where("date", "==", tomorrowStr));
  const thisWeekQ = query(tasksRef, where("date", "in", weekDates));

  let todayTasks: Task[] = [];
  let tomorrowTasks: Task[] = [];
  let thisWeekTasks: Task[] = [];

  const unsubscribes: (() => void)[] = [];

  unsubscribes.push(
    onSnapshot(todayQ, (snapshot) => {
      todayTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      onUpdate({ todayTasks, tomorrowTasks, thisWeekTasks });
    }),
    onSnapshot(tomorrowQ, (snapshot) => {
      tomorrowTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      onUpdate({ todayTasks, tomorrowTasks, thisWeekTasks });
    }),
    onSnapshot(thisWeekQ, (snapshot) => {
      const raw = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      thisWeekTasks = raw.filter(
        (task) =>
          !todayTasks.some((t) => t.id === task.id) &&
          !tomorrowTasks.some((t) => t.id === task.id)
      );
      onUpdate({ todayTasks, tomorrowTasks, thisWeekTasks });
    })
  );

  return () => unsubscribes.forEach((unsub) => unsub());
}
