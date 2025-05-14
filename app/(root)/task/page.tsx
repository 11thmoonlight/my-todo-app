"use client";

import { useAuth } from "@/context/AuthContext";

import { TaskSheet } from "@/components/TaskSheet";
import { Separator } from "@/components/ui/separator";
import { ListColorClasses } from "@/lib/ColorClasses";

import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { PiCalendarXFill } from "react-icons/pi";
import NewTaskForm from "@/components/NewTaskForm";
import { useEffect } from "react";
import { useTaskStore } from "@/lib/useTaskStore";

import TaskFilters from "@/components/TaskFilter";
import { useState } from "react";
import { updateTask } from "@/services/taskService";

export default function TaskPage() {
  const { user } = useAuth();
  const { tasks, listenToTasks, stopListening } = useTaskStore();
  const [updatingTaskIds, setUpdatingTaskIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    listenToTasks(user?.uid);
    setLoading(false);
    return () => stopListening();
  }, [user?.uid]);

  const [search, setSearch] = useState("");
  const [filterDone, setFilterDone] = useState<"all" | "done" | "not_done">(
    "all"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const normalizedSearch = search.toLowerCase();

  const matchesSearch = (task: Task) => {
    return (
      task.title?.toLowerCase().includes(normalizedSearch) ||
      task.description?.toLowerCase().includes(normalizedSearch) ||
      task.list?.title?.toLowerCase().includes(normalizedSearch) ||
      task.tag?.title?.toLowerCase().includes(normalizedSearch) ||
      task.subtasks?.some((sub) =>
        sub.title.toLowerCase().includes(normalizedSearch)
      )
    );
  };

  const matchesDoneStatus = (task: Task) => {
    if (filterDone === "done") return task.done === true;
    if (filterDone === "not_done") return task.done === false;
    return true;
  };

  const filteredTasks = tasks
    .filter((task) => matchesSearch(task) && matchesDoneStatus(task))
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const toggleDone = async (task: Task) => {
    if (!user?.uid) return;
    setUpdatingTaskIds((prev) => [...prev, task.id]);
    try {
      await updateTask(user.uid, task.id, { done: !task.done });
    } catch (err) {
      console.error("Failed to update task", err);
    } finally {
      setUpdatingTaskIds((prev) => prev.filter((id) => id !== task.id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="mx-2 flex flex-col gap-6 text-violet-900 mb-6">
      <div className="flex gap-6 items-center">
        <p className="text-4xl font-bold">All Tasks</p>
        <p className="text-2xl font-semibold px-2 py-1 border-2 border-violet-50 rounded-md">
          {tasks.length}
        </p>
      </div>
      <div className="flex flex-col gap-6 border-2 border-violet-100 rounded-md bg-violet-50 p-4">
        <TaskFilters
          onSearchChange={setSearch}
          onDoneFilterChange={setFilterDone}
          onSortChange={setSortOrder}
        />
        {user && <NewTaskForm userId={user?.uid} />}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col ml-[20px] gap-2 border-b-2 border-violet-200 pb-6 last:pb-0 last:border-0"
            >
              <div className="flex items-center justify-between ">
                <div className="flex gap-2 items-center">
                  {updatingTaskIds.includes(task.id) ? (
                    <div className="w-4 h-4 border-2 border-violet-700 rounded-full animate-spin border-t-transparent" />
                  ) : (
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleDone(task)}
                      disabled={updatingTaskIds.includes(task.id)}
                      className="w-4 h-4 accent-violet-300"
                    />
                  )}
                  <span>{task.title}</span>
                </div>

                {user && <TaskSheet task={task} />}
              </div>
              <div className="flex gap-4 ml-[24px] h-7">
                <div className="flex gap-2 items-center">
                  <PiCalendarXFill />
                  <p className="text-xs font-bold">{task.date}</p>
                </div>
                <Separator orientation="vertical" />
                <div className="flex gap-2 items-center">
                  <span className="bg-violet-200 px-2 py-1 flex items-center rounded-md text-xs font-bold">
                    {task.subtasks.length}
                  </span>
                  <p className="text-xs font-bold">Subtasks</p>
                </div>
                <Separator orientation="vertical" />
                <div className="flex items-center justify-between ">
                  <div className="flex gap-2 items-center">
                    <MdOutlineCheckBoxOutlineBlank
                      className={`${
                        ListColorClasses[
                          task.list.color as keyof typeof ListColorClasses
                        ]
                      } rounded-sm`}
                    />
                    <span className="text-xs font-bold">{task.list.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks found for this list.</p>
        )}
      </div>
    </div>
  );
}
