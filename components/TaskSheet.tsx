"use client";

import {
  Sheet,
  SheetContent,
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

import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Separator } from "./ui/separator";
// import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { Input } from "./ui/input";
import { deleteTask, updateTask } from "@/services/taskService";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLists } from "@/services/listService";
import { getTags } from "@/services/tagService";
import { useAuth } from "@/context/AuthContext";

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

export function TaskSheet({ task }) {
  const [allLists, setAllLists] = useState<List[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const { user } = useAuth();
  const userId = user?.uid;
  const [subtasks, setSubtasks] = useState(task.subtasks || []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title || "",
      description: task.description || "",
      list: task.list || { title: "", color: "" },
      tag: task.tag || { title: "", color: "" },
      date: task.date || "",
      time: task.time || "",
      priority: task.priority || "low",
      done: task.done || false,
      subtasks: task.subtasks || [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      const fetchedLists = await getLists(userId);
      const fetchedTags = await getTags(userId);
      setAllLists(fetchedLists as List[]);
      setAllTags(fetchedTags as Tag[]);
    };
    fetchData();
  }, [userId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateTask(userId, task.id, { ...values, subtasks });
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const onDelete = async () => {
    try {
      await deleteTask(userId, task.id);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="cursor-pointer">
          <IoChevronForwardOutline />
        </button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader className="flex flex-col gap-4">
          <SheetTitle className="text-2xl font-bold text-violet-900">
            Task:
          </SheetTitle>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="border-2 border-violet-100 px-4 py-2 rounded-md text-violet-400 font-semibold"
                        placeholder="Task Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="px-4 py-2 border-2 border-violet-100 rounded-md min-h-[100px] text-sm text-violet-400 font-semibold"
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between bg-stone-50 p-4 rounded-lg">
                <div className="flex flex-col gap-8 text-violet-800 font-semibold">
                  <p>List</p>
                  <p>Tags</p>
                  <p className="text-nowrap">Due Date</p>
                  <p>Time</p>
                </div>

                <div className="flex flex-col gap-4 text-violet-950">
                  <FormField
                    control={form.control}
                    name="list"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Select
                          onValueChange={(value) =>
                            field.onChange(JSON.parse(value))
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={task.list.title} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {allLists.map((list) => (
                              <SelectItem
                                key={list.id}
                                value={JSON.stringify({
                                  title: list.title,
                                  color: list.color,
                                })}
                              >
                                <span
                                  className="inline-block w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: list.color }}
                                ></span>
                                {list.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Select
                          onValueChange={(value) =>
                            field.onChange(JSON.parse(value))
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={task.tag.title} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {allTags.map((tag) => (
                              <SelectItem
                                key={tag.id}
                                value={JSON.stringify({
                                  title: tag.title,
                                  color: tag.color,
                                })}
                              >
                                <span
                                  className="inline-block w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: tag.color }}
                                ></span>
                                {tag.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <p className="text-2xl font-bold text-violet-900">
                    Subtasks:
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setSubtasks([{ title: "", done: false }, ...subtasks])
                    }
                    className="flex items-center gap-2 cursor-pointer ml-4"
                  >
                    <IoMdAdd size={20} className="text-violet-500" />
                    <span className="font-semibold text-violet-500 text-sm">
                      Add New Subtask
                    </span>
                  </button>
                  <Separator />
                  {subtasks.map((subtask, index) => (
                    <div key={index} className="flex items-center gap-2 ml-4">
                      <input
                        type="checkbox"
                        checked={subtask.done}
                        onChange={(e) => {
                          const updated = [...subtasks];
                          updated[index].done = e.target.checked;
                          setSubtasks(updated);
                        }}
                      />
                      <Input
                        value={subtask.title}
                        onChange={(e) => {
                          const updated = [...subtasks];
                          updated[index].title = e.target.value;
                          setSubtasks(updated);
                        }}
                        className="flex-1 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 justify-between mt-6">
                <Button
                  type="button"
                  onClick={() => onDelete()}
                  className="w-1/2 bg-white text-violet-900 border-violet-300 border-2 hover:bg-pink-50 hover:border-pink-100 active:scale-80 transition-transform duration-300"
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  className="w-1/2 bg-violet-300 text-violet-950 hover:bg-violet-200 active:scale-80 transition-transform duration-300"
                >
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
