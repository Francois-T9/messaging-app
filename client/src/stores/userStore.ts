import { create } from "zustand";
import type {
  LoginInput,
  UserStore,
  UserData,
  LoginOutput,
} from "@/types/types";
// import type { User } from "@/types/types";

export const useUserStore = create<UserStore>((set) => ({
  currentUser: { name: "", userId: 0, accessToken: "", refreshToken: "" },
  usersArray: [],
  login: async ({
    name,
    password,
  }: LoginInput): Promise<LoginOutput | UserData> => {
    const userData = { name, password };
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userData.name,
        password: userData.password,
      }),
    });

    const data = await response.json();

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }

    if (response.status == 200) {
      set({ currentUser: data });
    }
    return data;
  },
  signup: async ({
    name,
    password,
  }: LoginInput): Promise<LoginOutput | UserData> => {
    const newUserData = { name, password };
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newUserData.name,
        password: newUserData.password,
      }),
    });

    const data = await response.json();
    return data;
  },
  logout: async (): Promise<boolean> => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    const response = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status == 200) {
      console.log("Logged out successfully");
      localStorage.setItem("accessToken", "null");
      localStorage.setItem("refreshToken", "null");
      return true;
    } else return false;
  },
}));
