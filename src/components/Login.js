import { useState } from "react";
import { login } from "../api";
import "./Auth.css"; // Reuse the same CSS

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      if (res.user) {
        onLoginSuccess(res.user);
      } else {
        setMessage(res.error || "Login failed");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}
