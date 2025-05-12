"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { TaskSheet } from "@/components/TaskSheet";
import { Separator } from "@/components/ui/separator";
import { ListColorClasses } from "@/lib/ColorClasses";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { PiCalendarXFill } from "react-icons/pi";
import NewTaskForm from "@/components/NewTaskForm";
import { subscribeToTagTasks } from "@/lib/subscribeToTagTasks";

interface TagPageProps {
  params: { tagTitle: string };
}

export default function TagPage({ params }: TagPageProps) {
  const { user } = useAuth();
  const [tagTasks, setTagTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToTagTasks(
      user.uid,
      params.tagTitle,
      setTagTasks
    );

    return () => unsubscribe();
  }, [user, params.tagTitle]);

  return (
    <div className="mx-2 flex flex-col gap-6 text-violet-900 mb-6">
      <div className="flex gap-6 items-center">
        <p className="text-4xl font-bold">{params.tagTitle}</p>
        <p className="text-2xl font-semibold px-2 py-1 border-2 border-violet-50 rounded-md">
          {tagTasks.length}
        </p>
      </div>
      <div className="flex flex-col gap-6 border-2 border-violet-100 rounded-md bg-violet-50 p-4">
        {user && <NewTaskForm userId={user?.uid} />}
        {tagTasks.length > 0 ? (
          tagTasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col ml-[20px] gap-2 border-b-2 border-violet-200 pb-6 last:pb-0 last:border-0"
            >
              <div className="flex items-center justify-between ">
                <div className="flex gap-2 items-center">
                  <MdOutlineCheckBoxOutlineBlank className="text-violet-400" />
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
          <p className="flex items-center justify-center font-semibold text-xl h-32">
            No tasks here yet !
          </p>
        )}
      </div>
    </div>
  );
}
