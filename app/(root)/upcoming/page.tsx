"use client";

import { IoMdAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoChevronForwardOutline } from "react-icons/io5";
import { PiCalendarXFill } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import { TaskSheet } from "@/components/TaskSheet";
import React, { useEffect, useState } from "react";

import NewTaskForm from "@/components/NewTaskForm";
import { useAuth } from "@/context/AuthContext";

import { getFilteredTasks } from "@/services/taskFilters";

const colorClasses = {
  amber: "text-amber-500 bg-amber-500",
  blue: "text-blue-500 bg-blue-500",
  cyan: "text-cyan-500 bg-cyan-500",
  emerald: "text-emerald-500 bg-emerald-500",
  fuchsia: "text-fuchsia-500 bg-fuchsia-500",
  gray: "text-gray-500 bg-gray-500",
  green: "text-green-500 bg-green-500",
  indigo: "text-indigo-500 bg-indigo-500",
  lime: "text-lime-500 bg-lime-500",
  neutral: "text-neutral-500 bg-neutral-500",
  orange: "text-orange-500 bg-orange-500",
  pink: "text-pink-500 bg-pink-500",
  purple: "text-purple-500 bg-purple-500",
  red: "text-red-500 bg-red-500",
  rose: "text-rose-500 bg-rose-500",
  sky: "text-sky-500 bg-sky-500",
  slate: "text-slate-500 bg-slate-500",
  stone: "text-stone-500 bg-stone-500",
  teal: "text-teal-500 bg-teal-500",
  violet: "text-violet-500 bg-violet-500",
  yellow: "text-yellow-500 bg-yellow-500",
  zinc: "text-zinc-500 bg-zinc-500",
};

export default function Upcoming() {
  const { user } = useAuth();
  console.log(user);

  const [tasks, setTasks] = useState({
    todayTasks: [],
    tomorrowTasks: [],
    thisWeekTasks: [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      if (user?.uid) {
        const filtered = await getFilteredTasks(user.uid);
        setTasks(filtered);
      }
    };

    fetchTasks();
  }, [user]);

  console.log("tasks", tasks);

  return (
    <div className="mx-2 flex flex-col gap-6 text-violet-900 mb-6">
      <div className="flex gap-6 items-center">
        <p className="text-4xl font-bold">Upcoming</p>
        <p className="text-2xl font-semibold px-2 py-1 border-2 border-violet-50 rounded-md">
          12
        </p>
      </div>
      <div className="flex flex-col gap-6 border-2 border-violet-100 rounded-md bg-violet-50 p-4">
        <p className="text-xl font-bold">Today</p>

        <NewTaskForm userId={user?.uid} />

        {tasks.todayTasks.map((task) => (
          <div key={task.id} className="flex flex-col ml-[20px] gap-2">
            <div className="flex items-center justify-between ">
              <div className="flex gap-2 items-center">
                <MdOutlineCheckBoxOutlineBlank className="text-violet-400" />
                <span>{task.title}</span>
              </div>
              <TaskSheet task={task} userId={user?.uid} />
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
                    className={`${colorClasses[task.list.color]} rounded-sm`}
                  />
                  <span className="text-xs font-bold">{task.list.title}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-6 lg:flex-row flex-col">
        <div className="flex flex-col gap-6 border-2 border-violet-100 rounded-md bg-violet-50 p-4 w-full">
          <p className="text-xl font-bold">Tomorrow</p>
          <button className="flex items-center gap-2 border-2 border-violet-200 p-4 rounded-md cursor-pointer">
            <IoMdAdd size={20} className="text-violet-500" />
            <span className="font-semibold text-violet-500">Add New Task</span>
          </button>
          {tasks.tomorrowTasks.map((task) => (
            <div key={task.id} className="flex flex-col ml-[20px] gap-2">
              <div className="flex items-center justify-between ">
                <div className="flex gap-2 items-center">
                  <MdOutlineCheckBoxOutlineBlank className="text-violet-400" />
                  <span>{task.title}</span>
                </div>
                <TaskSheet task={task} />
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
                      className={`${colorClasses[task.list.color]} rounded-sm`}
                    />
                    <span className="text-xs font-bold">{task.list.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6 border-2 border-violet-100 rounded-md bg-violet-50 p-4 w-full">
          <p className="text-xl font-bold">This Week</p>
          <button className="flex items-center gap-2 border-2 border-violet-200 p-4 rounded-md cursor-pointer">
            <IoMdAdd size={20} className="text-violet-500" />
            <span className="font-semibold text-violet-500">Add New Task</span>
          </button>

          {tasks.thisWeekTasks.map((task) => (
            <div key={task.id} className="flex flex-col ml-[20px] gap-2">
              <div className="flex items-center justify-between ">
                <div className="flex gap-2 items-center">
                  <MdOutlineCheckBoxOutlineBlank className="text-violet-400" />
                  <span>{task.title}</span>
                </div>
                <TaskSheet task={task} />
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
                      className={`${colorClasses[task.list.color]} rounded-sm`}
                    />
                    <span className="text-xs font-bold">{task.list.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
