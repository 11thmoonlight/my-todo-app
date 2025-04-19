"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
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

import NewListForm from "./NewListForm";
import NewTagForm from "./NewTagForm";
import { useEffect, useState } from "react";
import { getLists } from "@/services/listService";

import { useAuth } from "@/context/AuthContext";

type List = {
  id: string;
  name: string;
  [key: string]: any;
};

const colorClasses = {
  amber: "text-amber-600 bg-amber-600",
  blue: "text-blue-600 bg-blue-600",
  cyan: "text-cyan-600 bg-cyan-600",
  emerald: "text-emerald-600 bg-emerald-600",
  fuchsia: "text-fuchsia-600 bg-fuchsia-600",
  gray: "text-gray-600 bg-gray-600",
  green: "text-green-600 bg-green-600",
  indigo: "text-indigo-600 bg-indigo-600",
  lime: "text-lime-600 bg-lime-600",
  neutral: "text-neutral-600 bg-neutral-600",
  orange: "text-orange-600 bg-orange-600",
  pink: "text-pink-600 bg-pink-600",
  purple: "text-purple-600 bg-purple-600",
  red: "text-red-600 bg-red-600",
  rose: "text-rose-600 bg-rose-600",
  sky: "text-sky-600 bg-sky-600",
  slate: "text-slate-600 bg-slate-600",
  stone: "text-stone-600 bg-stone-600",
  teal: "text-teal-600 bg-teal-600",
  violet: "text-violet-600 bg-violet-600",
  yellow: "text-yellow-600 bg-yellow-600",
  zinc: "text-zinc-600 bg-zinc-600",
};
9;

export function AppSidebar() {
  const { user } = useAuth();
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getLists(user?.uid);
        setLists(data);
      } catch (error) {
        console.error("خطا در دریافت لیست‌ها:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchLists();
    }
  }, [user?.uid]);

  console.log(lists);

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
                {lists.map((list) => (
                  <SidebarMenuItem key={list.id}>
                    <SidebarMenuButton>
                      <div className="flex gap-2 items-center">
                        <MdOutlineCheckBoxOutlineBlank
                          className={`${colorClasses[list.color]} rounded-sm`}
                        />
                        <span>{list.title}</span>
                      </div>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className="text-violet-800 bg-violet-100 py-2 px-3">
                      4
                    </SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}

                <SidebarMenuItem>
                  <SidebarMenuButton className="cursor-pointer">
                    <NewListForm />
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
                  <NewTagForm />
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
