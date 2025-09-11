import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MessagesComponentProps } from "@/types/types";
// import { useEffect, useState } from "react";
// import { useUserStore } from "@/stores/userStore";
function Messages({ currentUser, receivedMessages }: MessagesComponentProps) {
  // const { getUsernameById } = useUserStore();
  // const [username, setUsername] = useState<string>("");

  return (
    <div>
      {" "}
      <CardHeader>
        <CardTitle>Hello {currentUser.name}</CardTitle>
        <CardDescription>Welcome to the messaging app!</CardDescription>
      </CardHeader>
      <CardContent>
        {receivedMessages.map((message, key) => (
          <Card key={key} className="">
            <CardHeader>
              <CardTitle>{message.content}</CardTitle>
              <CardDescription>
                {new Date(message.createdAt).toLocaleString("en-DE")}
              </CardDescription>
            </CardHeader>
            <CardContent>From {message.senderId}</CardContent>
          </Card>
        ))}
      </CardContent>
    </div>
  );
}

export default Messages;
