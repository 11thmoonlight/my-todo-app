"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
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
import { PiSignOutBold } from "react-icons/pi";
import Link from "next/link";
import { MdDoubleArrow } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { LuStickyNote } from "react-icons/lu";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

import NewListForm from "./NewListForm";
import NewTagForm from "./NewTagForm";
import { useEffect, useState } from "react";
import { listenToLists } from "@/services/listService";

import { useAuth } from "@/context/AuthContext";
import { listenToTags } from "@/services/tagService";

import { ListColorClasses, TagcolorClasses } from "@/lib/ColorClasses";

export function AppSidebar() {
  const { user } = useAuth();
  const [lists, setLists] = useState<List[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = listenToLists(user.uid, (data: List[]) => {
      setLists(data);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = listenToTags(user.uid, (data: Tag[]) => {
      setTags(data);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <Sidebar>
      <SidebarHeader className="text-violet-900">
        <span className="font-semibold text-lg">Menu</span>
      </SidebarHeader>
      <SidebarContent className="text-violet-900 ">
        <SidebarMenu className="overflow-y-auto glass-scrollbar overflow-x-hidden">
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
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="flex gap-2">
                    <LuListTodo />
                    <Link href="/task">All Tasks</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LuCalendarDays />
                    <Link href="/calendar">Calendar</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LuStickyNote />
                    <Link href="/sticky">Sticky Wall</Link>
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
                    <Link href={`/list/${encodeURIComponent(list.title)}`}>
                      <SidebarMenuButton className="cursor-pointer">
                        <div className="flex gap-2 items-center">
                          <MdOutlineCheckBoxOutlineBlank
                            className={`${
                              ListColorClasses[
                                list.color as keyof typeof ListColorClasses
                              ]
                            } rounded-sm`}
                          />
                          <span>{list.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </Link>
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
                  <Link
                    href={`/tag/${encodeURIComponent(tag.title)}`}
                    key={tag.id}
                    className="cursor-pointer"
                  >
                    <div
                      className={`py-1 px-3 ${
                        TagcolorClasses[
                          tag.color as keyof typeof TagcolorClasses
                        ]
                      } w-fit rounded-sm text-xs font-semibold`}
                    >
                      {tag.title}
                    </div>
                  </Link>
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
          <PiSignOutBold />
          <span>Sign Out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
