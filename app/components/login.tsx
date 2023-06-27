// login.tsx
import Locale from "../locales";

import { IconButton } from "../components/button";
import { useState } from "react";
import { useUserStore } from "../store/user";
// import { authenticateUser } from '../api/auth';
import { Link, useNavigate } from "react-router-dom";
import { NextResponse } from "next/server";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const useStore = useUserStore();
  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      await useStore.login(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      return NextResponse.error();
    }
  };

  return (
    <div>
      <h1>{Locale.LOGIN.Title}</h1>
      <form>
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
          text={Locale.LOGIN.Title}
          title={Locale.LOGIN.Title}
          type="primary"
          onClick={(event) => {
            handleLogin(event);
          }}
        />
        {/* <button type="submit">Login</button> */}
      </form>
      <p>
        {Locale.LOGIN.NotHaveAccount}?{" "}
        <Link to="/register">{Locale.LOGIN.Register}</Link>
      </p>
    </div>
  );
};

export default LoginPage;
