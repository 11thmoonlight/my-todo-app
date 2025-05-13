"use client";

import React, { useState } from "react";
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
import { IoMdAdd } from "react-icons/io";
import { createStikies } from "@/services/stickyServices";
import { AiOutlineClose } from "react-icons/ai";
import { Label } from "./ui/label";

const colors = [
  { value: "yellow", bgClass: "bg-yellow-200" },
  { value: "red", bgClass: "bg-red-200" },
  { value: "orange", bgClass: "bg-orange-200" },
  { value: "amber", bgClass: "bg-amber-200" },
  { value: "lime", bgClass: "bg-lime-200" },
  { value: "green", bgClass: "bg-green-200" },
  { value: "emerald", bgClass: "bg-emerald-200" },
  { value: "teal", bgClass: "bg-teal-200" },
  { value: "cyan", bgClass: "bg-cyan-200" },
  { value: "sky", bgClass: "bg-sky-200" },
  { value: "indigo", bgClass: "bg-indigo-200" },
  { value: "violet", bgClass: "bg-violet-200" },
  { value: "purple", bgClass: "bg-purple-200" },
  { value: "fuchsia", bgClass: "bg-fuchsia-200" },
  { value: "pink", bgClass: "bg-pink-200" },
  { value: "rose", bgClass: "bg-rose-200" },
  { value: "slate", bgClass: "bg-slate-200" },
  { value: "zinc", bgClass: "bg-zinc-200" },
  { value: "stone", bgClass: "bg-stone-200" },
  { value: "neutral", bgClass: "bg-neutral-200" },
];

const formSchema = z.object({
  title: z.string().min(1, "Required"),
  color: z.string().min(1, "Required"),
  description: z.string().optional(),
  subs: z
    .array(
      z.object({
        title: z.string(),
      })
    )
    .optional(),
});

export default function NewStickyForm({ userId }: { userId: string }) {
  const [subInput, setSubInput] = useState("");
  const [subs, setSubs] = useState<StickySubType[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      subs: [],
      color: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createStikies(userId, {
        ...values,
        subs,
      });
      form.reset();
      setSubs([]);
      setOpen(false);
    } catch (err) {
      console.error("Error creating sticky:", err);
    }
  };

  const handleAddSubtask = () => {
    if (subInput.trim()) {
      setSubs((prev) => [...prev, { title: subInput.trim() }]);
      setSubInput("");
    }
  };

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-2 border-2 border-violet-200 p-4 rounded-xl cursor-pointer hover:bg-violet-100 active:scale-95 transition-transform duration-300 w-[250px] h-[250px]">
          <IoMdAdd size={60} className="text-violet-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-violet-900 p-6">
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

            <div>
              <div className="flex gap-2">
                <Input
                  value={subInput}
                  onChange={(e) => setSubInput(e.target.value)}
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

              {subs.length > 0 && (
                <ul className="mt-3 space-y-2 text-sm text-violet-800 bg-stone-50 rounded-lg shadow-lg max-h-[130px] overflow-y-auto dark-scrollbar">
                  {subs.map((task, index) => (
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

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-wrap gap-3 rtl:space-x-reverse items-center justify-center ">
                    {colors.map((color) => (
                      <Label
                        key={color.value}
                        className="cursor-pointer hover:bg-yellow-100 hover:scale-105 rounded-lg active:scale-95 transition-all duration-300 mb-2"
                      >
                        <Input
                          type="radio"
                          value={color.value}
                          checked={field.value === color.value}
                          onChange={() => field.onChange(color.value)}
                          className="hidden peer"
                        />
                        <div
                          className={`w-6 h-6 rounded-full border-2 border-white ${color.bgClass} peer-checked:ring-2 peer-checked:ring-violet-300`}
                        />
                      </Label>
                    ))}
                  </div>
                </FormItem>
              )}
            />

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
