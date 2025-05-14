// components/TaskCard.tsx
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { PiCalendarXFill } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import { TaskSheet } from "@/components/TaskSheet";
import { ListColorClasses } from "@/lib/colorClasses";
import NewTaskForm from "@/components/NewTaskForm";
import { useState } from "react";
import { updateTask } from "@/services/taskService";

interface TaskCardProps {
  title: string;
  tasks: Task[];
  userId: string;
}

export default function TaskCard({ title, tasks, userId }: TaskCardProps) {
  const [updatingTaskIds, setUpdatingTaskIds] = useState<string[]>([]);

  const toggleDone = async (task: Task) => {
    if (!userId) return;
    setUpdatingTaskIds((prev) => [...prev, task.id]);
    try {
      await updateTask(userId, task.id, { done: !task.done });
    } catch (err) {
      console.error("Failed to update task", err);
    } finally {
      setUpdatingTaskIds((prev) => prev.filter((id) => id !== task.id));
    }
  };

  return (
    <div className="flex flex-col gap-6 border-2 border-violet-100 rounded-md bg-violet-50 p-4 max-h-[350px] overflow-y-auto glass-scrollbar w-full">
      <p className="sm:text-xl text-base font-bold">{title}</p>

      {userId && <NewTaskForm userId={userId} />}

      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex flex-col ml-[20px] gap-2 border-b-2 border-violet-200 pb-6 last:pb-0 last:border-0"
        >
          <div className="flex items-center justify-between">
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
            <TaskSheet task={task} />
          </div>
          <div className="flex gap-4 ml-[24px] h-7">
            <div className="flex gap-2 items-center">
              <PiCalendarXFill />
              <p className="text-xs font-bold text-nowrap">{task.date}</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex gap-2 items-center">
              <span className="bg-violet-200 px-2 py-1 flex items-center rounded-md text-xs font-bold">
                {task.subtasks.length}
              </span>
              <p className="text-xs font-bold">Subtasks</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <MdOutlineCheckBoxOutlineBlank
                  className={`${
                    ListColorClasses[
                      task.list.color as keyof typeof ListColorClasses
                    ]
                  } rounded-sm`}
                />
                <span className="text-xs font-bold text-nowrap">
                  {task.list.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
