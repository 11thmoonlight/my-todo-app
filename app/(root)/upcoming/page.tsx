"use client";

import { IoMdAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoChevronForwardOutline } from "react-icons/io5";
import { PiCalendarXFill } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import { TaskSheet } from "@/components/TaskSheet";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { format } from "date-fns";
import { IoIosFlag } from "react-icons/io";
import { Label } from "@radix-ui/react-label";

export default function Upcoming() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="mx-2 flex flex-col gap-6 text-violet-900 mb-6">
      <div className="flex gap-6 items-center">
        <p className="text-4xl font-bold">Upcoming</p>
        <p className="text-2xl font-semibold px-2 py-1 border-2 border-violet-50 rounded-md">
          12
        </p>
      </div>
      <div className="flex flex-col gap-6 border-2 border-violet-100 rounded-md bg-violet-50 p-4">
        <p className="text-xl font-bold">Today</p>

        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 border-2 border-violet-200 p-4 rounded-md cursor-pointer hover:bg-violet-200 active:scale-95 transition-transform duration-300">
              <IoMdAdd size={20} className="text-violet-500" />
              <span className="font-semibold text-violet-500">
                Add New Task
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] text-violet-900">
            <DialogHeader>
              <DialogTitle className="text-center font-bold text-xl mb-3">
                Add new task
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-6">
              <Input
                id="title"
                placeholder="Task Title"
                className="col-span-3"
              />

              <Textarea placeholder="Description..." className="w-full" />

              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="sm:w-[180px] w-[160px]">
                    <SelectValue placeholder="Chosse a List" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Personal</SelectItem>
                    <SelectItem value="dark">Work</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="sm:w-[180px] w-[160px]">
                    <SelectValue placeholder="Choose a Tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Personal</SelectItem>
                    <SelectItem value="dark">Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Input type="time" />
              </div>

              <div className="flex gap-2">
                <Input type="text" placeholder="Add a Subtask" />
                <Button className="bg-violet-900 text-violet-100 hover:bg-violet-700 active:scale-80 transition-transform duration-300 rounded-4xl">
                  Add
                </Button>
              </div>

              <div className="flex sm:space-x-5 space-x-2 rtl:space-x-reverse items-center">
                <p className="font-bold text-violet-800">priority:</p>
                <Label className="cursor-pointer hover:bg-green-100 hover:scale-105 rounded-lg active:scale-95 transition-all duration-300">
                  <Input
                    type="radio"
                    name="priority"
                    value="low"
                    className="hidden peer"
                  />
                  <div className="flex gap-1 items-end justify-center p-3 rounded-lg border border-gray-300 peer-checked:border-green-500 peer-checked:bg-green-50 transition">
                    <span className="text-sm mt-1 text-gray-700 mb-[1px]">
                      Low
                    </span>
                    <IoIosFlag className="text-green-500" size={18} />
                  </div>
                </Label>

                <Label className="cursor-pointer hover:bg-yellow-100 hover:scale-105 rounded-lg active:scale-95 transition-all duration-300">
                  <Input
                    type="radio"
                    name="priority"
                    value="medium"
                    className="hidden peer"
                  />
                  <div className="flex gap-1 items-end justify-center p-3 rounded-lg border border-gray-300 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 transition">
                    <span className="text-sm mt-1 text-gray-700 mb-[1px]">
                      Medium
                    </span>
                    <IoIosFlag className="text-yellow-400" size={18} />
                  </div>
                </Label>

                <Label className="cursor-pointer hover:bg-red-100 hover:scale-105 rounded-lg active:scale-95 transition-all duration-300">
                  <Input
                    type="radio"
                    name="priority"
                    value="high"
                    className="hidden peer"
                  />
                  <div className="flex gap-1 items-end justify-center p-3 rounded-lg border border-gray-300 peer-checked:border-red-500 peer-checked:bg-red-50 transition">
                    <span className="text-sm mt-1 text-gray-700 mb-[1px]">
                      High
                    </span>
                    <IoIosFlag className="text-red-400" size={18} />
                  </div>
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full mt-6 bg-violet-300 text-violet-950 hover:bg-violet-200 active:scale-80 transition-transform duration-300"
              >
                Add Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex flex-col ml-[20px] gap-2">
          <div className="flex items-center justify-between ">
            <div className="flex gap-2 items-center">
              <MdOutlineCheckBoxOutlineBlank className="text-violet-400" />
              <span>Research content ideas</span>
            </div>
            <TaskSheet />
          </div>
          <div className="flex gap-4 ml-[24px] h-7">
            <div className="flex gap-2 items-center">
              <PiCalendarXFill />
              <p className="text-xs font-bold">23/10/02</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex gap-2 items-center">
              <span className="bg-violet-200 px-2 py-1 flex items-center rounded-md text-xs font-bold">
                18
              </span>
              <p className="text-xs font-bold">Subtasks</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex items-center justify-between ">
              <div className="flex gap-2 items-center">
                <MdOutlineCheckBoxOutlineBlank className="text-blue-500 bg-blue-500 rounded-sm" />
                <span className="text-xs font-bold">Personal</span>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col ml-[20px] gap-3">
          <div className="flex items-center justify-between ">
            <div className="flex gap-2 items-center">
              <MdOutlineCheckBoxOutlineBlank className="text-violet-400" />
              <span>Research content ideas</span>
            </div>
            <IoChevronForwardOutline />
          </div>
          <div className="flex gap-4 ml-[24px] h-7">
            <div className="flex gap-2 items-center">
              <PiCalendarXFill />
              <p className="text-xs font-bold">23/10/02</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex gap-2 items-center">
              <span className="bg-violet-200 px-2 py-1 flex items-center rounded-md text-xs font-bold">
                18
              </span>
              <p className="text-xs font-bold">Subtasks</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex items-center justify-between ">
              <div className="flex gap-2 items-center">
                <MdOutlineCheckBoxOutlineBlank className="text-blue-500 bg-blue-500 rounded-sm" />
                <span className="text-xs font-bold">Personal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-6 lg:flex-row flex-col">
        <div className="flex flex-col gap-6 border-2 border-violet-100 rounded-md bg-violet-50 p-4 w-full">
          <p className="text-xl font-bold">Tomorrow</p>
          <button className="flex items-center gap-2 border-2 border-violet-200 p-4 rounded-md cursor-pointer">
            <IoMdAdd size={20} className="text-violet-500" />
            <span className="font-semibold text-violet-500">Add New Task</span>
          </button>
          <div className="flex flex-col ml-[20px] gap-2">
            <div className="flex items-center justify-between ">
              <div className="flex gap-2 items-center">
                <MdOutlineCheckBoxOutlineBlank className="text-violet-400" />
                <span>Research content ideas</span>
              </div>
              <IoChevronForwardOutline />
            </div>
            <div className="flex gap-4 ml-[24px] h-7">
              <div className="flex gap-2 items-center">
                <PiCalendarXFill />
                <p className="text-xs font-bold">23/10/02</p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex gap-2 items-center">
                <span className="bg-violet-200 px-2 py-1 flex items-center rounded-md text-xs font-bold">
                  18
                </span>
                <p className="text-xs font-bold">Subtasks</p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center justify-between ">
                <div className="flex gap-2 items-center">
                  <MdOutlineCheckBoxOutlineBlank className="text-blue-500 bg-blue-500 rounded-sm" />
                  <span className="text-xs font-bold">Personal</span>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col ml-[20px] gap-3">
            <div className="flex items-center justify-between ">
              <div className="flex gap-2 items-center">
                <MdOutlineCheckBoxOutlineBlank className="text-violet-400" />
                <span>Research content ideas</span>
              </div>
              <IoChevronForwardOutline />
            </div>
            <div className="flex gap-4 ml-[24px] h-7">
              <div className="flex gap-2 items-center">
                <PiCalendarXFill />
                <p className="text-xs font-bold">23/10/02</p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex gap-2 items-center">
                <span className="bg-violet-200 px-2 py-1 flex items-center rounded-md text-xs font-bold">
                  18
                </span>
                <p className="text-xs font-bold">Subtasks</p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center justify-between ">
                <div className="flex gap-2 items-center">
                  <MdOutlineCheckBoxOutlineBlank className="text-blue-500 bg-blue-500 rounded-sm" />
                  <span className="text-xs font-bold">Personal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 border-2 border-violet-100 rounded-md bg-violet-50 p-4 w-full">
          <p className="text-xl font-bold">This Week</p>
          <button className="flex items-center gap-2 border-2 border-violet-200 p-4 rounded-md cursor-pointer">
            <IoMdAdd size={20} className="text-violet-500" />
            <span className="font-semibold text-violet-500">Add New Task</span>
          </button>
          <div className="flex flex-col ml-[20px] gap-2">
            <div className="flex items-center justify-between ">
              <div className="flex gap-2 items-center">
                <MdOutlineCheckBoxOutlineBlank className="text-violet-400" />
                <span>Research content ideas</span>
              </div>
              <IoChevronForwardOutline />
            </div>
            <div className="flex gap-4 ml-[24px] h-7">
              <div className="flex gap-2 items-center">
                <PiCalendarXFill />
                <p className="text-xs font-bold">23/10/02</p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex gap-2 items-center">
                <span className="bg-violet-200 px-2 py-1 flex items-center rounded-md text-xs font-bold">
                  18
                </span>
                <p className="text-xs font-bold">Subtasks</p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center justify-between ">
                <div className="flex gap-2 items-center">
                  <MdOutlineCheckBoxOutlineBlank className="text-blue-500 bg-blue-500 rounded-sm" />
                  <span className="text-xs font-bold">Personal</span>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col ml-[20px] gap-3">
            <div className="flex items-center justify-between ">
              <div className="flex gap-2 items-center">
                <MdOutlineCheckBoxOutlineBlank className="text-violet-400" />
                <span>Research content ideas</span>
              </div>
              <IoChevronForwardOutline />
            </div>
            <div className="flex gap-4 ml-[24px] h-7">
              <div className="flex gap-2 items-center">
                <PiCalendarXFill />
                <p className="text-xs font-bold">23/10/02</p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex gap-2 items-center">
                <span className="bg-violet-200 px-2 py-1 flex items-center rounded-md text-xs font-bold">
                  18
                </span>
                <p className="text-xs font-bold">Subtasks</p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center justify-between ">
                <div className="flex gap-2 items-center">
                  <MdOutlineCheckBoxOutlineBlank className="text-blue-500 bg-blue-500 rounded-sm" />
                  <span className="text-xs font-bold">Personal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
