import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  LoginInput,
  AuthStore,
  UserData,
  LoginOutput,
} from "@/types/types";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      currentUser: { name: "", userId: 0, accessToken: "", refreshToken: "" },

      login: async ({
        name,
        password,
      }: LoginInput): Promise<LoginOutput | UserData> => {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, password }),
        });

        const data = await response.json();

        if (response.status === 200 && data.accessToken) {
          set({ currentUser: data }); // 👈 this is automatically persisted
        }

        return data;
      },

      signup: async ({
        name,
        password,
      }: LoginInput): Promise<LoginOutput | UserData> => {
        const response = await fetch("http://localhost:3000/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, password }),
        });

        return response.json();
      },

      logout: async (): Promise<boolean> => {
        const { currentUser } = get();
        const response = await fetch("http://localhost:3000/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        });

        if (response.status === 200) {
          console.log("Logged out successfully");
          set({
            currentUser: {
              name: "",
              userId: 0,
              accessToken: "",
            },
          }); // 👈 persist clears automatically
          return true;
        }
        return false;
      },
    }),
    {
      name: "user-storage", // key in localStorage
      // optional: whitelist only currentUser
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
);
