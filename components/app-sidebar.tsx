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

export function AppSidebar() {
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
                    Today
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="text-violet-800 bg-violet-100 py-2 px-3">
                    4
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LuCalendarDays />
                    Calendar
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LuStickyNote />
                    Sticky Wall
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
                  <SidebarMenuButton>
                    <IoMdAdd size={20} className="text-violet-500" />
                    Add New List
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
              <CollapsibleContent>
                <SidebarGroupContent />
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <SidebarGroup />
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <p>Setteings</p>
        <p>Sign Out</p>
      </SidebarFooter>
    </Sidebar>
  );
}
