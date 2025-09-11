import type { ChatProps } from "@/types/types";
import { useAuthStore } from "@/stores/authStore";
import { useConversationStore } from "@/stores/conversationStore";
import { useEffect, useState } from "react";
import type { Message } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { Button } from "./ui/button";
function Chat({ partner }: ChatProps) {
  const { getMessagesFromPartner } = useConversationStore();
  const { currentUser } = useAuthStore();
  const [messagesFromPartner, setMessagesFromPartner] = useState<Message[]>([]);

  const fetchMessagesFromPartner = async () => {
    const APIresponse = await getMessagesFromPartner(currentUser, partner.id);
    setMessagesFromPartner(APIresponse);
  };

  useEffect(() => {
    fetchMessagesFromPartner();
  }, [partner]);

  return (
    <div className="p-2">
      <h1 className="text-2xl">Chat with {partner.name}</h1>
      {messagesFromPartner.length !== 0 ? (
        messagesFromPartner.map((messages, key) => (
          <Card key={key} className="">
            <CardHeader>
              <CardTitle>From {partner.name}</CardTitle>
              <CardDescription>
                {new Date(messages.createdAt).toLocaleString("en-DE")}
              </CardDescription>
            </CardHeader>
            <CardContent> {messages.content}</CardContent>
          </Card>
        ))
      ) : (
        <div>
          <p>No messages yet</p>
          <Link to="*">
            <Button variant={"default"}>Start chatting!</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Chat;
