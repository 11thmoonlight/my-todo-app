import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <AuthProvider>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 mx-5">
            <SidebarTrigger />
            {children}
          </div>
        </SidebarProvider>
      </AuthProvider>
    </main>
  );
}
