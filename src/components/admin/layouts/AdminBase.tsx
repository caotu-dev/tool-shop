// src/components/admin/AdminShell.jsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminBase({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="p-4 border-b bg-white">
          <SidebarTrigger />
        </header>
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
