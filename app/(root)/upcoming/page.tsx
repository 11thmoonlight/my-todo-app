"use client";

import { IoMdAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { PiCalendarXFill } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import { TaskSheet } from "@/components/TaskSheet";
import React, { useEffect, useState } from "react";

import NewTaskForm from "@/components/NewTaskForm";
import { useAuth } from "@/context/AuthContext";

import { getFilteredTasks } from "@/services/taskFilters";
import { ListColorClasses } from "@/lib/ColorClasses";

export default function Upcoming() {
  const { user } = useAuth();

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
    const fetchTasks = async () => {
      if (user?.uid) {
        const filtered = await getFilteredTasks(user.uid);
        setTasks(
          filtered as {
            todayTasks: Task[];
            tomorrowTasks: Task[];
            thisWeekTasks: Task[];
          }
        );
      }
    };

    fetchTasks();
  }, [user]);

  return (
    <div className="mx-2 flex flex-col gap-6 text-violet-900 mb-6">
      <div className="flex gap-6 items-center">
        <p className="text-4xl font-bold">Upcoming</p>
        <p className="text-2xl font-semibold px-2 py-1 border-2 border-violet-50 rounded-md">
          12
        </p>
      </div>
      <div className="flex flex-col gap-6 border-2 border-violet-100 rounded-md bg-violet-50 p-4 h-[350px] overflow-y-scroll glass-scrollbar">
        <p className="text-xl font-bold">Today</p>

        <NewTaskForm userId={user?.uid} />

        {tasks.todayTasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col ml-[20px] gap-2 border-b-2 border-violet-200 pb-6 last:pb-0 last:border-0"
          >
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
        ))}
      </div>
      <div className="flex gap-6 lg:flex-row flex-col">
        <div className="flex flex-col gap-6 border-2 border-violet-100 rounded-md bg-violet-50 p-4 w-full h-[350px] overflow-y-scroll glass-scrollbar">
          <p className="text-xl font-bold">Tomorrow</p>
          <button className="flex items-center gap-2 border-2 border-violet-200 p-4 rounded-md cursor-pointer">
            <IoMdAdd size={20} className="text-violet-500" />
            <span className="font-semibold text-violet-500">Add New Task</span>
          </button>
          {tasks.tomorrowTasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col ml-[20px] gap-2 border-b-2 border-violet-200 pb-6 last:pb-0 last:border-0"
            >
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
          ))}
        </div>
        <div className="flex flex-col gap-6 border-2 border-violet-100 rounded-md bg-violet-50 p-4 w-full h-[350px] overflow-y-scroll glass-scrollbar">
          <p className="text-xl font-bold">This Week</p>
          <button className="flex items-center gap-2 border-2 border-violet-200 p-4 rounded-md cursor-pointer">
            <IoMdAdd size={20} className="text-violet-500" />
            <span className="font-semibold text-violet-500">Add New Task</span>
          </button>

          {tasks.thisWeekTasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col ml-[20px] gap-2 border-b-2 border-violet-200 pb-6 last:pb-0 last:border-0"
            >
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
          ))}
        </div>
      </div>
    </div>
  );
}
