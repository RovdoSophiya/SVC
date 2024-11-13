import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/assets/pages/_components/header/header";
import Main from "../src/assets/pages/mainPage/mainPage";
import Footer from "./assets/pages/_components/footer/footer";
import Login from "./assets/pages/loginPage/loginPage";
import Client from "./assets/pages/clientPage/clientPage";
import Courier from "./assets/pages/couirerPage/courierPage";
import CourierAvailDeliveries from "./assets/pages/couirerPage/courierAvailableDeliveriesPage";
// import Registration from "./assets/pages/registrationPage/registrationPage";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);

    const fetchUserData = async () => {
      const userId = localStorage.getItem("id");
      setUserId(userId);
      if (userId) {
        let response;
        if (role === "client") {
          response = await fetch(`http://localhost:5000/api/clients/${userId}`);
        } else if (role === "courier") {
          response = await fetch(
            `http://localhost:5000/api/couriers/${userId}`
          );
        }
        const data = await response.json();
        setUser(data); // Сохраняем данные пользователя
      }
      setLoading(false); // Устанавливаем состояние загрузки в false
    };

    fetchUserData();
  }, []);
  return (
    <BrowserRouter>
      <Header
        user={user}
        userRole={userRole}
        userId={userId}
        loading={loading}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/dishes" element={<Dishes />} />
        <Route path="/Reviews" element={<Reviews />} */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/client"
          element={
            <Client
              user={user}
              userRole={userRole}
              userId={userId}
              loading={loading}
            />
          }
        />
        <Route
          path="/courier"
          element={
            <Courier
              user={user}
              userRole={userRole}
              userId={userId}
              loading={loading}
            />
          }
        />
        <Route
          path="/courier/availableDeliveries"
          element={<CourierAvailDeliveries userId={userId} />}
        />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
