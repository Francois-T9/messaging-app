import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./app-sidebar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className=" flex w-screen h-screen items-center justify-center">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
