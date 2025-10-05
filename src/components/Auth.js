import { useState } from "react";
import { login, signup } from "../api";
import "./Auth.css";

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Only for signup
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await login(username, password);
        if (res.user) onLoginSuccess(res.user);
        else setMessage(res.error || "Login failed");
      } else {
        const res = await signup(username, password, role);
        setMessage(res.message || res.error);
        if (!res.error) setIsLogin(true); // Go to login after successful signup
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
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
        {!isLogin && (
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>

      <p className="auth-message">{message}</p>
      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign up" : "Login"}
        </span>
      </p>
    </div>
  );
}
