import { create } from "zustand";
import type {
  ConversationState,
  UserList,
  UserData,
  Message,
} from "@/types/types";

export const useConversationStore = create<ConversationState>()((set) => ({
  partner: null,

  setPartner: (user: UserList) => set({ partner: user }),
  getMessagesFromPartner: async (
    user: UserData,
    partnerId: number
  ): Promise<Message[]> => {
    const response = await fetch(
      `http://localhost:3000/api/messages/${partnerId}/${user.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    );

    if (response.status !== 200) {
      set({ chatError: response.statusText });
      console.log(response.statusText);
    }

    const data = await response.json();

    return data;
  },
}));
