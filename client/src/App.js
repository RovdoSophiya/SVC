import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/assets/pages/_components/header/header";
import Main from "../src/assets/pages/mainPage/mainPage";
import Footer from "./assets/pages/_components/footer/footer";
import Login from "./assets/pages/loginPage/loginPage";
import Client from "./assets/pages/clientPage/clientPage";
import Courier from "./assets/pages/couirerPage/courierPage";
import CourierAvailDeliveries from "./assets/pages/couirerPage/courierAvailableDeliveriesPage";
import CourierCurrentDeliveries from "./assets/pages/couirerPage/courierCurrentDeliveries";
import CourierOrderHistory from "./assets/pages/couirerPage/courierOrderHistory";
import ReviewPage from "./assets/pages/reviewPage/reviewPage";
import Registration from "./assets/pages/registrationPage/registrationPage";
import Event from "./assets/pages/eventsPage/eventsPage";
import DishPage from "./assets/pages/dishPage/dishPage";
import CartPage from "./assets/pages/clientPage/cartPage";
import "./App.css";
import { fetchClientById } from "../src/assets/api/clients/clientApi";
import { fetchCourierById } from "../src/assets/api/couriers/courierApi";

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
        try {
          let data;
          if (role === "client") {
            data = await fetchClientById(userId);
          } else if (role === "courier") {
            data = await fetchCourierById(userId);
          }
          setUser(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          console.error("Error details:", error.response?.data || error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("id");
    setUser(null);
    setUserRole(null);
    setUserId(null);
  };

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
        <Route path="/event" element={<Event />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/dishes" element={<DishPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/client"
          element={
            <Client
              user={user}
              userRole={userRole}
              userId={userId}
              loading={loading}
              onLogout={handleLogout}
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
        <Route
          path="/courier/currentDeliveries"
          element={<CourierCurrentDeliveries userId={userId} />}
        />
        <Route
          path="/courier/deliveryHistory"
          element={<CourierOrderHistory userId={userId} />}
        />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
