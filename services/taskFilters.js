import { getTasks } from "@/services/taskService";
import {
  startOfToday,
  endOfToday,
  addDays,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
} from "date-fns";

export const getFilteredTasks = async (userId) => {
  const tasks = await getTasks(userId);

  const todayStart = startOfToday();
  const todayEnd = endOfToday();
  const tomorrowStart = addDays(todayStart, 1);
  const tomorrowEnd = addDays(todayEnd, 1);
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });

  const todayTasks = tasks.filter((task) => {
    const due = task.date;
    return due && isWithinInterval(due, { start: todayStart, end: todayEnd });
  });

  const tomorrowTasks = tasks.filter((task) => {
    const due = task.date;
    return (
      due && isWithinInterval(due, { start: tomorrowStart, end: tomorrowEnd })
    );
  });

  const thisWeekTasks = tasks.filter((task) => {
    const due = task.date;
    return due && isWithinInterval(due, { start: weekStart, end: weekEnd });
  });

  return {
    todayTasks,
    tomorrowTasks,
    thisWeekTasks,
  };
};
