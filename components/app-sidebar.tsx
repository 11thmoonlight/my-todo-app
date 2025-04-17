import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronDown } from "lucide-react";
import { LuSettings } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import Link from "next/link";
import { MdDoubleArrow } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import { LuStickyNote } from "react-icons/lu";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function AppSidebar() {
  const colors = [
    {
      value: "yellow",
      bgClass: "bg-yellow-500",
    },
    {
      value: "red",
      bgClass: "bg-red-500",
    },
    {
      value: "orange",
      bgClass: "bg-orange-500",
    },
    {
      value: "amber",
      bgClass: "bg-amber-500",
    },
    {
      value: "lime",
      bgClass: "bg-lime-500",
    },
    {
      value: "green",
      bgClass: "bg-green-500",
    },
    {
      value: "emerald",
      bgClass: "bg-emerald-500",
    },
    {
      value: "teal",
      bgClass: "bg-teal-500",
    },
    {
      value: "cyan",
      bgClass: "bg-cyan-500",
    },
    {
      value: "sky",
      bgClass: "bg-sky-500",
    },
    {
      value: "indigo",
      bgClass: "bg-indigo-500",
    },
    {
      value: "violet",
      bgClass: "bg-violet-500",
    },
    {
      value: "purple",
      bgClass: "bg-purple-500",
    },
    {
      Value: "fuchsia",
      bgClass: "bg-fuchsia-500",
    },
    {
      Value: "pink",
      bgClass: "bg-pink-500",
    },
    {
      Value: "rose",
      bgClass: "bg-rose-500",
    },
    {
      Value: "slate",
      bgClass: "bg-slate-500",
    },
    {
      Value: "zinc",
      bgClass: "bg-zinc-500",
    },
    {
      Value: "stone",
      bgClass: "bg-stone-500",
    },
    { value: "neutral", bgClass: "bg-neutral-500" },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="text-violet-900">
        <span className="font-semibold text-lg">Menu</span>
      </SidebarHeader>
      <SidebarContent className="text-violet-900">
        <SidebarMenu className="overflow-hidden">
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="text-violet-950">
                  TASKS
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarMenuItem>
                  <SidebarMenuButton className="flex gap-2">
                    <MdDoubleArrow />
                    <Link href="/upcoming">Upcoming</Link>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="text-violet-800 bg-violet-100 py-2 px-3">
                    4
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FaListCheck />
                    <Link href="today">Today</Link>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="text-violet-800 bg-violet-100 py-2 px-3">
                    4
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LuCalendarDays />
                    <Link href="calendar">Calendar</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LuStickyNote />
                    <Link href="sticky">Sticky Wall</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <SidebarSeparator />

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="text-violet-950">
                  LISTS
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <div className="flex gap-2 items-center">
                      <MdOutlineCheckBoxOutlineBlank className="text-amber-600 bg-amber-600 rounded-sm" />
                      <span>Personal</span>
                    </div>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="text-violet-800 bg-violet-100 py-2 px-3">
                    4
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <div className="flex gap-2 items-center">
                      <MdOutlineCheckBoxOutlineBlank className="text-cyan-400 bg-cyan-400 rounded-sm" />
                      <span>Work</span>
                    </div>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="text-violet-800 bg-violet-100 py-2 px-3">
                    4
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="cursor-pointer">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="flex gap-2">
                          <IoMdAdd size={20} className="text-violet-500" />
                          Add New List
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] text-violet-900">
                        <DialogHeader>
                          <DialogTitle className="text-center font-bold text-xl mb-3">
                            Add New List
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Input
                            id="title"
                            placeholder="List Title"
                            className="col-span-3"
                          />
                        </div>

                        <div className="flex flex-wrap gap-3 rtl:space-x-reverse items-center justify-center">
                          {colors.map((color) => (
                            <Label
                              key={color.value}
                              className="cursor-pointer hover:bg-yellow-100 hover:scale-105 rounded-lg active:scale-95 transition-all duration-300 mb-2"
                            >
                              <Input
                                type="radio"
                                name="priority"
                                value={color.value}
                                className="hidden peer"
                              />
                              <div
                                className={`flex gap-1 items-end justify-center p-3 rounded-lg transition
                  ${color.bgClass} peer-checked:bg-gray-200`}
                              ></div>
                            </Label>
                          ))}
                        </div>

                        <DialogFooter>
                          <Button
                            type="submit"
                            className="w-full mt-6 bg-violet-300 text-violet-950 hover:bg-violet-200 active:scale-80 transition-transform duration-300"
                          >
                            Add List
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <SidebarSeparator />

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="text-violet-950">
                  TAGS
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="flex flex-wrap gap-2">
                <div className="py-1 px-3 bg-pink-200 w-fit rounded-sm text-xs font-semibold">
                  Tag 1
                </div>
                <div className="py-1 px-3 bg-blue-200 w-fit rounded-sm text-xs font-semibold">
                  Tag 2
                </div>
                <SidebarMenuButton className="cursor-pointer">
                  <Dialog>
                    <DialogTrigger asChild className="w-full">
                      <div className="flex gap-1 bg-gray-200 p-2 rounded-md text-xs">
                        <IoMdAdd size={16} className="text-violet-500" />
                        <span className="font-semibold">Add New Tag</span>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] text-violet-900">
                      <DialogHeader>
                        <DialogTitle className="text-center font-bold text-xl mb-3">
                          Add New Tag
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Input
                          id="title"
                          placeholder="Tag Title"
                          className="col-span-3"
                        />
                      </div>

                      <div className="flex flex-wrap gap-3 rtl:space-x-reverse items-center justify-center">
                        {colors.map((color) => (
                          <Label
                            key={color.value}
                            className="cursor-pointer hover:bg-yellow-100 hover:scale-105 rounded-lg active:scale-95 transition-all duration-300 mb-2"
                          >
                            <Input
                              type="radio"
                              name="priority"
                              value={color.value}
                              className="hidden peer"
                            />
                            <div
                              className={`flex gap-1 items-end justify-center p-3 rounded-lg transition
                  ${color.bgClass} peer-checked:bg-gray-200`}
                            ></div>
                          </Label>
                        ))}
                      </div>

                      <DialogFooter>
                        <Button
                          type="submit"
                          className="w-full mt-6 bg-violet-300 text-violet-950 hover:bg-violet-200 active:scale-80 transition-transform duration-300"
                        >
                          Add List
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </SidebarMenuButton>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <SidebarGroup />
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 text-violet-900">
        <button className="flex gap-2 items-center">
          <LuSettings />
          <span>Setteings</span>
        </button>
        <button className="flex gap-2 items-center">
          <PiSignOutBold />
          <span>Sign Out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
