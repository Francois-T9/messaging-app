import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MessagesStore, Message } from "@/types/types";

export const useMessagesStore = create<MessagesStore>()(
  persist(
    (set) => ({
      receivedMessages: [],
      getMessages: async (
        id: number,
        accessToken: string
      ): Promise<Message[]> => {
        const response = await fetch(
          `http://localhost:3000/api/messages/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response);

        if (response.status !== 200) {
          set({ messagesError: response.statusText });
        }
        const data = await response.json();
        return data;
      },
    }),
    {
      name: "user-storage", // key in localStorage
      // optional: whitelist only currentUser
    }
  )
);
