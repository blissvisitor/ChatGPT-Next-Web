// login.tsx
import "../styles/login.scss";

import Locale from "../locales";
import { showToast } from "./ui-lib";
import { IconButton } from "../components/button";
import LoginIcon from "../icons/login.svg";
import { useState } from "react";
import { useUserStore } from "../store/user";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { NextResponse } from "next/server";
const LoginPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const useStore = useUserStore();
  const handleLogin = async (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.preventDefault();
    }
    if (email === "" || password === "") {
      123;
      setMessage("Please enter your email and password");
      setTimeout(() => {
        setMessage("");
      }, 1500);
      return;
    }
    try {
      const bl = await useStore.login(email, password);
      console.log("login finish");
      console.log(useStore.token);
      if (bl) {
        navigate(Path.Dashboard);
      } else {
        console.log("not login");
      }
    } catch (error) {
      console.error(error);
      return NextResponse.error();
    }
  };

  return (
    <div className="login">
      <h1>{Locale.LOGIN.Title}</h1>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form className="form">
        <label>
          {Locale.LOGIN.Email}:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          {Locale.LOGIN.Password}:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <IconButton
          bordered
          icon={<LoginIcon />}
          text={Locale.LOGIN.Title}
          title={Locale.LOGIN.Title}
          type="primary"
          onClick={handleLogin}
        />
      </form>
      <p>
        {Locale.LOGIN.NotHaveAccount}
        <Link to="/register">{Locale.LOGIN.Register}</Link>
      </p>
    </div>
  );
};

export default LoginPage;
