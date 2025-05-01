"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { IoMdAdd, IoIosFlag } from "react-icons/io";
import { createTask } from "@/services/taskService";
import { AiOutlineClose } from "react-icons/ai";
import { ListColorClasses } from "@/lib/ColorClasses";

const formSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  subtasks: z
    .array(
      z.object({
        title: z.string(),
      })
    )
    .optional(),
});

export default function NewTaskForm({ userId }: { userId: string }) {
  const [subInput, setSubInput] = useState("");
  const [subs, setSubs] = useState<[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      subtasks: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createTask(userId, {
        ...values,
        subs,
      });
      form.reset();
      setSubs([]);
    } catch (err) {
      console.error("Error creating sticky:", err);
    }
  };

  const handleAddSubtask = () => {
    if (subInput.trim()) {
      setSubs((prev) => [...prev, { title: subtaskInput.trim() }]);
      setSubtaskInput("");
    }
  };

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const handleDeleteSubtask = (index: number) => {
    setSubs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditSubtask = (index: number) => {
    setEditingIndex(index);
    setEditingText(subs[index].title);
  };

  const handleSaveEdit = () => {
    if (editingText.trim()) {
      setSubs((prev) =>
        prev.map((task, i) =>
          i === editingIndex ? { ...task, title: editingText.trim() } : task
        )
      );
      setEditingIndex(null);
      setEditingText("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 border-2 border-violet-200 p-4 rounded-md cursor-pointer hover:bg-violet-200 active:scale-95 transition-transform duration-300">
          <IoMdAdd size={20} className="text-violet-500" />
          <span className="font-semibold text-violet-500">
            Add New Sticky Note
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-violet-900">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl mb-3">
            Add new Sticky Note
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Task Title" {...field} />
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
                    <Textarea placeholder="Description..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <p className="text-violet-700 font-bold tracking-wide">
                    Priority:
                  </p>
                  <FormItem>
                    <div className="flex gap-3">
                      {["low", "medium", "high"].map((level) => (
                        <label
                          key={level}
                          className={`cursor-pointer border p-2 rounded-lg transition-all ${
                            field.value === level
                              ? "border-violet-500 bg-violet-100"
                              : "border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            value={level}
                            checked={field.value === level}
                            onChange={() => field.onChange(level)}
                            className="hidden"
                          />
                          <div className="flex items-center gap-2">
                            <span className="capitalize">{level}</span>
                            <IoIosFlag
                              className={`${
                                level === "low"
                                  ? "text-green-500"
                                  : level === "medium"
                                  ? "text-yellow-500"
                                  : "text-red-500"
                              }`}
                            />
                          </div>
                        </label>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <div>
              <div className="flex gap-2">
                <Input
                  value={subtaskInput}
                  onChange={(e) => setSubtaskInput(e.target.value)}
                  placeholder="New subtask..."
                />
                <Button
                  type="button"
                  onClick={handleAddSubtask}
                  className="bg-violet-300 text-violet-950 hover:bg-violet-200"
                >
                  Add
                </Button>
              </div>

              {subtasks.length > 0 && (
                <ul className="mt-3 space-y-2 text-sm text-violet-800 bg-stone-50 rounded-lg shadow-lg max-h-[130px] overflow-y-auto dark-scrollbar">
                  {subtasks.map((task, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 border-b-2 last:border-0 border-violet-100 font-semibold p-2 m-2 pb-4 last:pb-2"
                    >
                      {editingIndex === index ? (
                        <>
                          <Input
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="w-full"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={handleSaveEdit}
                            className="text-green-600"
                          >
                            Save
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingIndex(null);
                              setEditingText("");
                            }}
                            className="text-gray-500"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <span className="flex-1">{task.title}</span>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => handleEditSubtask(index)}
                            className="text-teal-900 bg-teal-100 font-semibold shadow-lg hover:bg-teal-200 hover:scale-105 active:scale-95 transition-transform duration-300"
                          >
                            Edit
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => handleDeleteSubtask(index)}
                            className="text-pink-900 bg-pink-100 shadow-lg hover:bg-pink-200 hover:scale-105 active:scale-95 transition-transform duration-300"
                          >
                            <AiOutlineClose />
                          </Button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-violet-300 text-violet-950 hover:bg-violet-200 hover:scale-105 active:scale-95 transition-transform duration-300"
              >
                Add Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
