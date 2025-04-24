"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoChevronForwardOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Separator } from "./ui/separator";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { Input } from "./ui/input";
import { updateTask } from "@/services/taskService";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  list: z.object({
    title: z.string(),
    color: z.string(),
  }),
  tag: z.object({
    title: z.string(),
    color: z.string(),
  }),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  priority: z.enum(["low", "medium", "high"]),
  done: z.boolean().optional(),
  subtasks: z
    .array(
      z.object({
        title: z.string(),
        done: z.boolean().optional(),
      })
    )
    .optional(),
});

export function TaskSheet({ task }, userId) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [list, setList] = useState(task.list || "Personal");
  const [dueTime, setDueTime] = useState(task.dueTime || "");
  const [tags, setTags] = useState(task.tags || []);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [subtasks, setSubtasks] = useState<{ title: string; done: boolean }[]>(
    []
  );

  const handleUpdate = async () => {
    const updatedData = { title, description, list, dueTime, tags };
    await updateTask(userId, task.id, updatedData);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="cursor-pointer">
          <IoChevronForwardOutline />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-col gap-4">
          <SheetTitle className="text-2xl font-bold text-violet-900">
            Task:
          </SheetTitle>
          <Input className="border-2 border-violet-100 px-4 py-2 rounded-md text-violet-600 font-semibold">
            {task.title}
          </Input>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </SheetHeader>
        <div className="mx-4 flex flex-col gap-6">
          <p className="px-4 py-2 border-2 border-violet-100 rounded-md min-h-[100px] text-sm text-gray-500">
            {task.description}
          </p>
          <div className="flex gap-10">
            <div className="flex flex-col gap-8 text-violet-800 font-semibold">
              <p>List</p>
              <p>Due Date</p>
              <p>Tags</p>
            </div>

            <div className="flex flex-col gap-4 text-violet-950">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Personal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Personal</SelectItem>
                  <SelectItem value="dark">Work</SelectItem>
                </SelectContent>
              </Select>

              <Input type="time" />
              <div className="flex gap-4 items-center">
                <p className="py-2 px-4 bg-amber-500 rounded-md w-fit font-semibold text-sm">
                  Tag 1
                </p>
                <p className="flex gap-1 items-center bg-gray-100 py-2 px-4 rounded-md">
                  <IoMdAdd size={14} className="" />
                  <span className="font-semibold md:text-sm text-xs">
                    Add Tag
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-2xl font-bold text-violet-900">Subtasks:</p>
            <button className="flex items-center gap-2 cursor-pointer ml-4">
              <IoMdAdd size={20} className="text-violet-500" />
              <span className="font-semibold text-violet-500 text-sm">
                Add New Subtask
              </span>
            </button>
            <Separator />
            <div className="flex gap-2 items-center ml-4">
              <MdOutlineCheckBoxOutlineBlank
                size={18}
                className="text-violet-200"
              />
              <span className="text-sm font-semibold text-violet-800">
                Subtask
              </span>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <div className="flex gap-2 justify-between">
              <Button className="w-1/2 bg-white text-violet-900 border-violet-300 border-2 hover:bg-pink-50 hover:border-pink-100 active:scale-80 transition-transform duration-300">
                Delete
              </Button>
              <Button
                type="submit"
                className="w-1/2 bg-violet-300 text-violet-950 hover:bg-violet-200 active:scale-80 transition-transform duration-300"
              >
                Save changes
              </Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
