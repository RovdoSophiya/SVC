import React from "react";
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
import OrderHistory from "./assets/pages/clientPage/orderHistory";
import EventHistory from "./assets/pages/clientPage/clientEvent";
import ReviewOrder from "./assets/pages/clientPage/clientReview";
import ClientCurrentDeliveries from "./assets/pages/clientPage/clientCurrent";
import "./App.css";
// import { fetchClientById } from "../src/assets/api/clients/clientApi";
// import CourierApi from "./assets/api/couriers/courierApi";

function App() {
  // const [user, setUser] = useState(null);
  // // const [loading, setLoading] = useState(true);
  // const role = localStorage.getItem("role");
  // const userId = localStorage.getItem("id");

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (userId) {
  //       try {
  //         let data;
  //         if (role === "client") {
  //           data = await fetchClientById(userId);
  //         } else if (role === "courier") {
  //           data = await CourierApi.fetchCourierById(userId);
  //         }
  //         setUser(data);
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //         console.error("Error details:", error.response?.data || error);
  //       }
  //     }
  //     // setLoading(false);
  //   };

  //   fetchUserData();
  // }, [role, userId]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/event" element={<Event />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/dishes" element={<DishPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/client" element={<Client />} />
        <Route path="/courier" element={<Courier />} />
        <Route
          path="/courier/availableDeliveries"
          element={<CourierAvailDeliveries />}
        />
        <Route
          path="/courier/currentDeliveries"
          element={<CourierCurrentDeliveries />}
        />
        <Route
          path="/courier/deliveryHistory"
          element={<CourierOrderHistory />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/client/orderHistory" element={<OrderHistory />} />
        <Route path="/client/eventHistory" element={<EventHistory />} />
        <Route path="/client/current" element={<ClientCurrentDeliveries />} />
        <Route path="/client/addReview" element={<ReviewOrder />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
