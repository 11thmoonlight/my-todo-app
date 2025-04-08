import { IoMdAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { IoChevronForwardOutline } from "react-icons/io5";
import { PiCalendarXFill } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import { TaskSheet } from "@/components/TaskSheet";

export default function Upcoming() {
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
