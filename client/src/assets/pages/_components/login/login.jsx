import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); //history для навигации

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
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login failed.");
      } else {
        // Сохранение данных пользователя в локальное хранилище
        localStorage.setItem("role", data.role);
        localStorage.setItem("userName", data.user.name);

        // Перенаправление в зависимости от роли
        if (data.role === "client") {
          navigate("/client"); // Перенаправление на страницу клиента
        } else if (data.role === "courier") {
          navigate("/courier"); // Перенаправление на страницу курьера
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
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
