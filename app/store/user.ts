import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreKey } from "../constant";
import Locale from "../locales";
// import useNavigate
let registerUrl = "http://127.0.0.1:5000/register";
let loginUrl = "http://127.0.0.1:5000/login";
let logoutUrl = "http://127.0.0.1:5000/logout";

import { showToast } from "../components/ui-lib";

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  permissions: string;
  expiration_date: string;
  isLoggedIn: boolean;
};

type UserState = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      login: async (email: string, password: string) => {
        // login api call with email and password fetch user data
        try {
          const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            const json = await response.json();
            set({ user: { ...json, isLoggedIn: true } as User });
            showToast(Locale.LOGIN.Success);
            //   setMessage("Registration successful!");
            // navigate(Path.Login);
          } else {
            console.error("Login failed:", response.statusText);
            showToast(Locale.LOGIN.Failed);
          }
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
      logout: () => {
        // logout api call
        fetch(logoutUrl, { method: "GET" });
        set({ user: null });
      },
      register: async (username: string, email: string, password: string) => {
        // register api call with username, email and password
        // const response = await fetch(registerUrl, { method: 'POST', body: JSON.stringify({ username, email, password }) })
        // const json = await response.json();
        // console.log(json)

        try {
          const response = await fetch(registerUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, password }),
          });

          if (response.ok) {
            showToast(Locale.REGISTER.Success);
            //   setMessage("Registration successful!");
            // navigate(Path.Login);
          } else {
            showToast(Locale.REGISTER.Failed);
            console.error("Registration failed:", response.statusText);
          }
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
    }),
    {
      name: StoreKey.User,
      version: 1,
    },
  ),
);
