import { create } from "zustand";
import type { UserStore, UserList, UserData } from "@/types/types";

export const useUserStore = create<UserStore>()((set) => ({
  allUsers: [],
  getAllUsers: async (currentUser: UserData): Promise<UserList[]> => {
    const APIresponse = await fetch("http://localhost:3000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    });
    const data = await APIresponse.json();
    if (APIresponse.status === 200) {
      set({ allUsers: data }); // 👈 this is automatically persisted
    }
    return data;
  },
  getUsernameById: async (
    userId: number,
    currentUser: UserData
  ): Promise<string> => {
    const APIresponse = await fetch(
      `http://localhost:3000/api/users/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      }
    );
    const data = await APIresponse.json();

    return data;
  },
}));
