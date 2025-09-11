"use client";

import {
  ChevronRight,
  LogOutIcon,
  MessageCircle,
  User2Icon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useMenuSelectionStore } from "@/stores/menuSelectionStore";
import { useConversationStore } from "@/stores/conversationStore";
import { useUserStore } from "@/stores/userStore";
export default function AppSidebar() {
  const { setDashboardChild } = useMenuSelectionStore();
  // const [allUsers, setAllUsers] = useState<UserList[]>([]);
  const { setPartner } = useConversationStore();
  const navigate = useNavigate();
  const { logout, currentUser } = useAuthStore();
  const { allUsers, getAllUsers } = useUserStore();
  const handleLogout = async () => {
    const res = logout();
    if (await res) {
      navigate("/");
    }
  };

  const fetchUsersFromAPI = async () => {
    await getAllUsers(currentUser);
  };
  useEffect(() => {
    fetchUsersFromAPI();
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Avatar className="h-8 w-32">
          <AvatarImage src="/logo.png" alt="App Logo" />
          <AvatarFallback>{currentUser.name}</AvatarFallback>
        </Avatar>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarMenu>
          <Collapsible asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="cursor-pointer">
                  <User2Icon />
                  <span>Friends</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {allUsers.map((user) => (
                    <SidebarMenuSubItem key={user.name}>
                      <SidebarMenuSubButton
                        className="cursor-pointer "
                        asChild
                        onClick={() => {
                          setDashboardChild("Chat");
                          setPartner(user);
                        }}
                      >
                        <Avatar className="h-8 w-32 ">
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
          <SidebarMenuItem>
            <SidebarMenuButton
              className="cursor-pointer"
              onClick={() => {
                setDashboardChild("Messages");
              }}
            >
              <MessageCircle />
              <span>Messages</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem key="logout">
            <SidebarMenuButton
              className="cursor-pointer"
              onClick={handleLogout}
            >
              <LogOutIcon />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
