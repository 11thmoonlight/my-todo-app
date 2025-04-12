import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 mx-5">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </main>
  );
}
