"use client";

import { ChevronRight, LogOutIcon, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";

const mockData = [
  {
    name: "FT",
    online: false,
  },
  {
    name: "JM",
    online: true,
  },
];
export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <a href="/" className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/logo.png" alt="App Logo" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
        </a>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarMenu>
        
          <Collapsible
            asChild

            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton >
                 <MessageCircle />
                  <span>Messages</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                 
                  {mockData.map((user) => (
                    <SidebarMenuSubItem key={user.name} >
                      <SidebarMenuSubButton asChild onClick={()=>{console.log(`you entered ${user.name} profile`)}}>
                       
                           <Avatar className="h-8 w-16">
                            <AvatarImage src="/logo.png" alt="App Logo" />
                            <AvatarFallback>{user.name}</AvatarFallback>
                          </Avatar>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
       
      </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem key="logout">
            <SidebarMenuButton asChild>
              <a href="/">
                <LogOutIcon />
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
