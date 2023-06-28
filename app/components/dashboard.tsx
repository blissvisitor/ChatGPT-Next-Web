import React from "react";
import { useUserStore } from "../store";
import { Link, useNavigate } from "react-router-dom";
import Locale from "../locales";
import { Path } from "../constant";
import "../styles/dashboard.scss";

import LogoutIcon from "../icons/logout.svg";
import { IconButton } from "./button";

export function Dashboard() {
  const userStore = useUserStore();
  const isLogin = userStore?.user?.isLoggedIn;
  const user = userStore.user;
  const navigate = useNavigate();

  const handleLogout = async (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.preventDefault();
    }
    userStore.logout();
    navigate(Path.Login);
  };

  return isLogin ? (
    <div className="dashboard">
      <div className="info">
        <h1>Welcome, {user?.username}!</h1>
        <p>
          {Locale.DASHBOARD.Email} {user?.email}.
        </p>
        <p>
          {Locale.DASHBOARD.Role} {user?.role}.
        </p>
        <p>
          {Locale.DASHBOARD.Expire} {user?.expiration_date}.
        </p>
        <Link to="/">{Locale.DASHBOARD.Home}</Link>
      </div>

      <IconButton
        className="logout"
        icon={<LogoutIcon />}
        title={Locale.LOGOUT.Title}
        text={Locale.LOGOUT.Title}
        shadow
        onClick={handleLogout}
      />
    </div>
  ) : (
    <>
      <div>{Locale.DASHBOARD.NotLogin}</div>
      <Link to="/login">{Locale.DASHBOARD.Login}</Link>
    </>
  );
}
