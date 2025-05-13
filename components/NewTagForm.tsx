"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { IoMdAdd } from "react-icons/io";
import { createTag } from "@/services/tagService";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const colors = [
  { value: "yellow", bgClass: "bg-yellow-300" },
  { value: "red", bgClass: "bg-red-300" },
  { value: "orange", bgClass: "bg-orange-300" },
  { value: "amber", bgClass: "bg-amber-300" },
  { value: "lime", bgClass: "bg-lime-300" },
  { value: "green", bgClass: "bg-green-300" },
  { value: "emerald", bgClass: "bg-emerald-300" },
  { value: "teal", bgClass: "bg-teal-300" },
  { value: "cyan", bgClass: "bg-cyan-300" },
  { value: "sky", bgClass: "bg-sky-300" },
  { value: "indigo", bgClass: "bg-indigo-300" },
  { value: "violet", bgClass: "bg-violet-300" },
  { value: "purple", bgClass: "bg-purple-300" },
  { value: "fuchsia", bgClass: "bg-fuchsia-300" },
  { value: "pink", bgClass: "bg-pink-300" },
  { value: "rose", bgClass: "bg-rose-300" },
  { value: "slate", bgClass: "bg-slate-300" },
  { value: "zinc", bgClass: "bg-zinc-300" },
  { value: "stone", bgClass: "bg-stone-300" },
  { value: "neutral", bgClass: "bg-neutral-300" },
];

const formSchema = z.object({
  title: z.string().min(1, "Required"),
  color: z.string().min(1, "Required"),
});

export default function NewTagForm() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      color: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createTag(user?.uid, {
        ...values,
      });
      form.reset();
      setOpen(false);
    } catch (err) {
      console.error("Error creating list:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="w-fit">
        <div className="flex gap-1 p-2 rounded-md text-xs">
          <IoMdAdd size={16} className="text-violet-500" />
          <span className="font-semibold">Add New Tag</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-violet-900 py-5 sm:p-6 px-3">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl mb-3">
            Add New Tag
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-wrap gap-3 rtl:space-x-reverse items-center justify-center">
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
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="w-full mt-6 bg-violet-300 text-violet-950 hover:bg-violet-200 active:scale-80 transition-transform duration-300"
              >
                Add Tag
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
