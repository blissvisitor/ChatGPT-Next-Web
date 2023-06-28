// register.tsx

import "../styles/register.scss";
import Locale from "../locales";
import { IconButton } from "../components/button";
import RegisterIcon from "../icons/register.svg";

import { useState } from "react";
import { useUserStore } from "../store/user";
import { Link, useNavigate } from "react-router-dom";

import { isValidEmail, isValidPassword } from "../utils/format";
const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const useStore = useUserStore();
  const handleRegister = async (
    event?: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (event) {
      event.preventDefault();
    }
    if (email === "" || username === "" || password === "") {
      setMessage("Please enter your email, username and password");
      setTimeout(() => {
        setMessage("");
      }, 1500);
      return;
    }
    if (!isValidEmail(email)) {
      setMessage("Invalid email format");
      return;
    }

    if (!isValidPassword(password)) {
      setMessage("Password must be at least 8 characters long");
      return;
    }
    try {
      await useStore.register(username, email, password);
      // setMessage("Registration successful!");
      // setTimeout(() => {setMessage("")}, 1500);
      // navigate(Path.Login);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register">
      <h1>{Locale.REGISTER.Title}</h1>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form className="form">
        <label>
          {Locale.REGISTER.Email}:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          {Locale.REGISTER.UserName}:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          {Locale.REGISTER.Password}:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <IconButton
          bordered
          icon={<RegisterIcon />}
          text={Locale.REGISTER.Title}
          title={Locale.REGISTER.Title}
          type="primary"
          onClick={handleRegister}
        />
      </form>
      <p>
        {Locale.REGISTER.HaveAccount}?{" "}
        <Link to="/login">{Locale.REGISTER.Login}</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
