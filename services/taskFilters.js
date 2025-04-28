import { getTasks } from "@/services/taskService";
import {
  startOfToday,
  endOfToday,
  addDays,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
} from "date-fns";

export const getFilteredTasks = async (
  userId,
  selectedListTitle,
  selectedTagTitle,
  searchQuery
) => {
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

  const listTasks = selectedListTitle
    ? tasks.filter(
        (task) =>
          task.list?.title?.toLowerCase() === selectedListTitle.toLowerCase()
      )
    : [];

  const tagTasks = selectedTagTitle
    ? tasks.filter(
        (task) =>
          task.tag?.title?.toLowerCase() === selectedTagTitle.toLowerCase()
      )
    : [];

  const searchTasks = searchQuery
    ? tasks.filter((task) => {
        const query = searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.list?.title?.toLowerCase().includes(query) ||
          task.tag?.title?.toLowerCase().includes(query) ||
          task.subtasks?.some((subtask) =>
            subtask.title.toLowerCase().includes(query)
          )
        );
      })
    : [];

  return {
    todayTasks,
    tomorrowTasks,
    thisWeekTasks,
    listTasks,
    tagTasks,
    searchTasks,
  };
};
