// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import React from "react";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { Calendar } from "@/components/ui/calendar";

// import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
// import { Label } from "./ui/label";
// import { Button } from "./ui/button";

// import { CalendarIcon } from "lucide-react";
// import { IoIosFlag } from "react-icons/io";
// import { IoMdAdd } from "react-icons/io";

// export default function NewTaskForm() {
//   const [date, setDate] = React.useState<Date>();

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <button className="flex items-center gap-2 border-2 border-violet-200 p-4 rounded-md cursor-pointer hover:bg-violet-200 active:scale-95 transition-transform duration-300">
//           <IoMdAdd size={20} className="text-violet-500" />
//           <span className="font-semibold text-violet-500">Add New Task</span>
//         </button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px] text-violet-900">
//         <DialogHeader>
//           <DialogTitle className="text-center font-bold text-xl mb-3">
//             Add new task
//           </DialogTitle>
//         </DialogHeader>
//         <div className="flex flex-col gap-6">
//           <Input id="title" placeholder="Task Title" className="col-span-3" />

//           <Textarea placeholder="Description..." className="w-full" />

//           <div className="flex gap-3">
//             <Select>
//               <SelectTrigger className="sm:w-[180px] w-[160px]">
//                 <SelectValue placeholder="Chosse a List" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="light">Personal</SelectItem>
//                 <SelectItem value="dark">Work</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select>
//               <SelectTrigger className="sm:w-[180px] w-[160px]">
//                 <SelectValue placeholder="Choose a Tag" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="light">Personal</SelectItem>
//                 <SelectItem value="dark">Work</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="flex gap-3">

//             <Input type="date" />
//             <Input type="time" />
//           </div>

//           <div className="flex gap-2">
//             <Input type="text" placeholder="Add a Subtask" />
//             <Button className="bg-violet-900 text-violet-100 hover:bg-violet-700 active:scale-80 transition-transform duration-300 rounded-4xl">
//               Add
//             </Button>
//           </div>

//           <div className="flex sm:space-x-5 space-x-2 rtl:space-x-reverse items-center">
//             <p className="font-bold text-violet-800">priority:</p>
//             <Label className="cursor-pointer hover:bg-green-100 hover:scale-105 rounded-lg active:scale-95 transition-all duration-300">
//               <Input
//                 type="radio"
//                 name="priority"
//                 value="low"
//                 className="hidden peer"
//               />
//               <div className="flex gap-1 items-end justify-center p-3 rounded-lg border border-gray-300 peer-checked:border-green-500 peer-checked:bg-green-50 transition">
//                 <span className="text-sm mt-1 text-gray-700 mb-[1px]">Low</span>
//                 <IoIosFlag className="text-green-500" size={18} />
//               </div>
//             </Label>

//             <Label className="cursor-pointer hover:bg-yellow-100 hover:scale-105 rounded-lg active:scale-95 transition-all duration-300">
//               <Input
//                 type="radio"
//                 name="priority"
//                 value="medium"
//                 className="hidden peer"
//               />
//               <div className="flex gap-1 items-end justify-center p-3 rounded-lg border border-gray-300 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 transition">
//                 <span className="text-sm mt-1 text-gray-700 mb-[1px]">
//                   Medium
//                 </span>
//                 <IoIosFlag className="text-yellow-400" size={18} />
//               </div>
//             </Label>

//             <Label className="cursor-pointer hover:bg-red-100 hover:scale-105 rounded-lg active:scale-95 transition-all duration-300">
//               <Input
//                 type="radio"
//                 name="priority"
//                 value="high"
//                 className="hidden peer"
//               />
//               <div className="flex gap-1 items-end justify-center p-3 rounded-lg border border-gray-300 peer-checked:border-red-500 peer-checked:bg-red-50 transition">
//                 <span className="text-sm mt-1 text-gray-700 mb-[1px]">
//                   High
//                 </span>
//                 <IoIosFlag className="text-red-400" size={18} />
//               </div>
//             </Label>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button
//             type="submit"
//             className="w-full mt-6 bg-violet-300 text-violet-950 hover:bg-violet-200 active:scale-80 transition-transform duration-300"
//           >
//             Add Task
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import React from "react";
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

const formSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  list: z.string().min(1, "Select a list"),
  tag: z.string().min(1, "Select a tag"),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  priority: z.enum(["low", "medium", "high"]),
});

export default function NewTaskForm({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      list: "",
      tag: "",
      date: undefined,
      time: "",
      priority: "low",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createTask(userId, values);
      form.reset();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 border-2 border-violet-200 p-4 rounded-md cursor-pointer hover:bg-violet-200 active:scale-95 transition-transform duration-300">
          <IoMdAdd size={20} className="text-violet-500" />
          <span className="font-semibold text-violet-500">Add New Task</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-violet-900">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl mb-3">
            Add new task
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

            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="list"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a List" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="work">Work</SelectItem>
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a Tag" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="optional">Optional</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3">
              {/* <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full text-left ${
                              !field.value ? "text-muted-foreground" : ""
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

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

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
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
                        <div className="flex items-center gap-1">
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
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-violet-300 text-violet-950 hover:bg-violet-200 active:scale-95 transition"
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
