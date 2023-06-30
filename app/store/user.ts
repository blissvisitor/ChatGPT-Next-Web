import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreKey } from "../constant";
import Locale from "../locales";
// import useNavigate
let registerUrl = "http://127.0.0.1:5000/register";
let loginUrl = "http://127.0.0.1:5000/login";
let logoutUrl = "http://127.0.0.1:5000/logout";
let userinfoUrl = "http://127.0.0.1:5000/user_info";
import { showToast } from "../components/ui-lib";
import { resolve } from "path";

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  permissions: string;
  expiration_date: string;
};

type UserState = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  userinfo: () => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
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
            console.log("login success");
            const json = await response.json();
            set({ token: json.data });
            get().userinfo();
            showToast(Locale.LOGIN.Success);
            return true;
          } else {
            const error = await response.json();
            showToast(`${Locale.LOGIN.Failed}: ${error.message}`);
            return false;
          }
        } catch (error) {
          console.error("LOGIN failed:", error);
          return false;
        }
      },
      logout: async () => {
        // logout api call
        try {
          const response = await fetch(logoutUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${get().token}`,
            },
          });
          if (response.ok) {
            const json = await response.json();
            set({ token: json.data });
            set({ user: null, token: null });
            showToast(Locale.LOGOUT.Success);
          } else {
            const error = await response.json();
            showToast(`${Locale.LOGOUT.Failed}: ${error.message}`);
          }
        } catch (error) {
          console.error("LOGOUT failed:", error);
          showToast(`${Locale.LOGOUT.Failed}: ${error}`);
        }
      },
      register: async (username: string, email: string, password: string) => {
        // register api call with username, email and password
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
            const error = await response.json();
            showToast(`${Locale.REGISTER.Failed}: ${error.message}`);
          }
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
      userinfo: async () => {
        const token = get().token;
        // login api call with email and password fetch user data
        try {
          const response = await fetch(`${userinfoUrl}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const json = await response.json();
            set({ user: json as User });
            // showToast(Locale.LOGIN.Success);
          } else {
            const error = await response.json();
            set({ token: null, user: null });
            // showToast(`${Locale.LOGIN.Failed}: ${error.message}`);
          }
        } catch (error) {
          set({ token: null, user: null });
          console.error("获取用户信息失败 failed:", error);
        }
      },
    }),
    {
      name: StoreKey.User,
      version: 1,
    },
  ),
);
