"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { TaskSheet } from "@/components/TaskSheet";
import { Separator } from "@/components/ui/separator";
import { ListColorClasses } from "@/lib/colorClasses";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { PiCalendarXFill } from "react-icons/pi";
import NewTaskForm from "@/components/NewTaskForm";
import { subscribeToListTasks } from "@/lib/subscribeToListTasks";
import { use } from "react";

export default function ListPage({
  params,
}: {
  params: Promise<{ listTitle: string }>;
}) {
  const { user } = useAuth();
  const [listTasks, setListTasks] = useState<Task[]>([]);
  const { listTitle } = use(params);
  const [loading, setLoading] = useState(true);
  const decodedListTitle = decodeURIComponent(listTitle);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToListTasks(user.uid, listTitle, setListTasks);
    setLoading(false);

    return () => unsubscribe();
  }, [user, listTitle]);

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
        <p className="text-4xl font-bold">{decodedListTitle}</p>
        <p className="text-2xl font-semibold px-2 py-1 border-2 border-violet-50 rounded-md">
          {listTasks.length}
        </p>
      </div>
      <div className="flex flex-col gap-6 border-2 border-violet-100 rounded-md bg-violet-50 p-4">
        {user && <NewTaskForm userId={user?.uid} />}
        {listTasks.length > 0 ? (
          listTasks.map((task) => (
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
          <p className="flex items-center justify-center font-semibold sm:text-xl text-base h-32">
            No tasks found for this list.
          </p>
        )}
      </div>
    </div>
  );
}
