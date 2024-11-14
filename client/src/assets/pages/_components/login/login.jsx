import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);

    const handlePopState = (event) => {
      window.history.pushState(null, document.title, window.location.href);
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Валидация
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/authorization/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Сохраняем JWT в sessionStorage
      const { token, role, user } = response.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("id", user.id);

      // Перенаправление в зависимости от роли
      if (role === "client") {
        navigate("/client"); // Перенаправление на страницу клиента
      } else if (role === "courier") {
        navigate("/courier"); // Перенаправление на страницу курьера
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed.";
      setError(message);
    }
  };

  return (
    <div className="loginContainer">
      <div className="authorizationLog">
        <p className="exCust">Existing Customers</p>
        <p style={{ marginBottom: "20px" }}>
          Please enter your login and password below:
        </p>
        <form className="authForm" onSubmit={handleSubmit}>
          <p style={{ marginBottom: "5px" }}>Login</p>
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <p style={{ marginBottom: "5px" }}>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
          ></input>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p style={{ marginTop: "5px", marginBottom: "5px" }}>
            Forgotten your username or password?
          </p>
          <button type="submit" className="SignIn">
            Sign in
          </button>
        </form>
      </div>
      <div className="toAuthorization">
        <p>New customers</p>
        <p>
          First time ordering with us? Create a new account, it's quick and
          simple
        </p>
        <a href="/registration">Create a new account</a>
      </div>
    </div>
  );
};

export default Login;
