import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VaoLogin.css";

export default function VaoLogin() {
  const [vaoId, setVaoId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    // ✅ FIXED FRONTEND CREDENTIALS
    if (vaoId === "VAO001" && password === "vao@123") {
      localStorage.setItem("vaoLoggedIn", "true");
      navigate("/vao");
    } else {
      setError("Invalid VAO ID or Password");
    }
  };

  return (
    <div className="vao-login-page">
      <form className="vao-login-card" onSubmit={login}>
        <h2>VAO Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          placeholder="VAO ID"
          value={vaoId}
          onChange={(e) => setVaoId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
