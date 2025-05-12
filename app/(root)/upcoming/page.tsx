"use client";

import React, { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";

import { subscribeToCategorizedTasks } from "@/lib/taskSubscriptions";
import TaskCard from "@/components/TaskCard";

export default function Upcoming() {
  const { user } = useAuth();
  const userId = user?.uid;
  const [tasks, setTasks] = useState<{
    todayTasks: Task[];
    tomorrowTasks: Task[];
    thisWeekTasks: Task[];
  }>({
    todayTasks: [],
    tomorrowTasks: [],
    thisWeekTasks: [],
  });

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = subscribeToCategorizedTasks(user.uid, setTasks);
    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <div className="mx-2 flex flex-col gap-6 text-violet-900 mb-6">
      <div className="flex sm:gap-6 gap-3 items-end">
        <p className="sm:text-4xl text-2xl font-bold">Upcoming</p>
        <p className="sm:text-2xl text-lg font-semibold px-2 border-2 border-violet-200 rounded-md">
          {tasks.thisWeekTasks.length}
        </p>
      </div>

      <TaskCard title="Today" tasks={tasks.todayTasks} userId={userId || ""} />
      <div className="flex gap-6 lg:flex-row flex-col">
        <TaskCard
          title="Tomorrow"
          tasks={tasks.tomorrowTasks}
          userId={userId || ""}
        />
        <TaskCard
          title="This Week"
          tasks={tasks.thisWeekTasks}
          userId={userId || ""}
        />
      </div>
    </div>
  );
}
