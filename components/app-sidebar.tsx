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
import { getTags } from "@/services/tagService";

type List = {
  id: string;
  name: string;
  [key: string]: any;
};

const colorClasses = {
  amber: "text-amber-500 bg-amber-500",
  blue: "text-blue-500 bg-blue-500",
  cyan: "text-cyan-500 bg-cyan-500",
  emerald: "text-emerald-500 bg-emerald-500",
  fuchsia: "text-fuchsia-500 bg-fuchsia-500",
  gray: "text-gray-500 bg-gray-500",
  green: "text-green-500 bg-green-500",
  indigo: "text-indigo-500 bg-indigo-500",
  lime: "text-lime-500 bg-lime-500",
  neutral: "text-neutral-500 bg-neutral-500",
  orange: "text-orange-500 bg-orange-500",
  pink: "text-pink-500 bg-pink-500",
  purple: "text-purple-500 bg-purple-500",
  red: "text-red-500 bg-red-500",
  rose: "text-rose-500 bg-rose-500",
  sky: "text-sky-500 bg-sky-500",
  slate: "text-slate-500 bg-slate-500",
  stone: "text-stone-500 bg-stone-500",
  teal: "text-teal-500 bg-teal-500",
  violet: "text-violet-500 bg-violet-500",
  yellow: "text-yellow-500 bg-yellow-500",
  zinc: "text-zinc-500 bg-zinc-500",
};

const TagcolorClasses = {
  amber: "text-amber-800 bg-amber-300",
  blue: "text-blue-800 bg-blue-300",
  cyan: "text-cyan-800 bg-cyan-300",
  emerald: "text-emerald-800 bg-emerald-300",
  fuchsia: "text-fuchsia-800 bg-fuchsia-300",
  gray: "text-gray-800 bg-gray-300",
  green: "text-green-800 bg-green-300",
  indigo: "text-indigo-800 bg-indigo-300",
  lime: "text-lime-800 bg-lime-300",
  neutral: "text-neutral-800 bg-neutral-300",
  orange: "text-orange-800 bg-orange-300",
  pink: "text-pink-800 bg-pink-300",
  purple: "text-purple-800 bg-purple-300",
  red: "text-red-800 bg-red-300",
  rose: "text-rose-800 bg-rose-300",
  sky: "text-sky-800 bg-sky-300",
  slate: "text-slate-800 bg-slate-300",
  stone: "text-stone-800 bg-stone-300",
  teal: "text-teal-800 bg-teal-300",
  violet: "text-violet-800 bg-violet-300",
  yellow: "text-yellow-800 bg-yellow-300",
  zinc: "text-zinc-800 bg-zinc-300",
};

export function AppSidebar() {
  const { user } = useAuth();
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tags, setTags] = useState([]);

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

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getTags(user?.uid);
        setTags(data);
      } catch (error) {
        console.error("خطا در دریافت لیست‌ها:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchTags();
    }
  }, [user?.uid]);

  console.log(tags);

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
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className={`py-1 px-3 ${
                      TagcolorClasses[tag.color]
                    } w-fit rounded-sm text-xs font-semibold`}
                  >
                    {tag.title}
                  </div>
                ))}
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
