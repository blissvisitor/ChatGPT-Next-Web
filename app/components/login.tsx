// login.tsx

import { useState } from "react";
import { useRouter } from "next/router";
// import { authenticateUser } from '../api/auth';
import { Link } from "react-router-dom";
const LoginPage = () => {
  //   const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      //   await authenticateUser(email, password);
      //   router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        Do not have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
