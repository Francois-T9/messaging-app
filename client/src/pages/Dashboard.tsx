import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import type { Message } from "@/types/types";
import Messages from "@/components/Messages";
import Chat from "@/components/Chat";
import { useMenuSelectionStore } from "@/stores/menuSelectionStore";
import { useConversationStore } from "@/stores/conversationStore";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useMessagesStore } from "@/stores/messagesStore";
function Dashboard() {
  const { partner, chatError } = useConversationStore();
  const { dashboardChild } = useMenuSelectionStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const { currentUser } = useAuthStore();
  const { messagesError } = useMessagesStore();
  const fetchMessages = async () => {
    const APIresponse = await fetch(
      `http://localhost:3000/api/messages/${currentUser.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      }
    );
    const data = await APIresponse.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    console.log(chatError);
  }, []);

  return (
    <div className="h-screen w-screen flex p-2">
      <Card className="w-screen">
        {chatError || messagesError ? (
          <div>
            <p className="text-red-500">Unauthorized </p>
            <Link to="/">
              <Button variant={"outline"}>Log in</Button>
            </Link>
          </div>
        ) : dashboardChild == "Messages" ? (
          <Messages currentUser={currentUser} receivedMessages={messages} />
        ) : (
          <Chat partner={partner} />
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
