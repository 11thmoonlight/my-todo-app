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

import { ListColorClasses, TagcolorClasses } from "@/lib/ColorClasses";

type List = {
  id: string;
  name: string;
  [key: string]: any;
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
                          className={`${
                            ListColorClasses[list.color]
                          } rounded-sm`}
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
