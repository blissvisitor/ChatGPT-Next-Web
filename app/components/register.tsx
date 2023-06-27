// register.tsx
import Locale from "../locales";
import { IconButton } from "../components/button";

import { useState } from "react";
import { useUserStore } from "../store/user";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../constant";
const RegisterPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const useStore = useUserStore();
  const handleRegister = async () => {
    try {
      await useStore.register(email, username, password);
      setMessage("Registration successful!");
      navigate(Path.Login);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{Locale.REGISTER.Title}</h1>
      {message && <p>{message}</p>}
      <form>
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
          text={Locale.REGISTER.Title}
          title={Locale.REGISTER.Title}
          type="primary"
          onClick={() => {
            handleRegister();
          }}
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
