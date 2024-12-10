import React, { useState } from "react";
import "./clientMain.css";
import icon1 from "../../../img/icons/event.png";
import icon2 from "../../../img/icons/cart.png";
import icon3 from "../../../img/icons/book.png";
import icon4 from "../../../img/icons/review.png";
import LogoutModal from "../modal/exitAccountModal/logoutModal";
import Cookies from "js-cookie";

const ClientMain = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleToggleLogoutModal = () => {
    setOpenLogoutModal((prev) => !prev);
  };

  const handleLogOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");
    Cookies.remove("refreshToken");
  };

  return (
    <div>
      <div className="clientContainer">
        <div className="block">
          <a href="/cart">
            <img alt="icon" src={icon2}></img>
          </a>
          <div className="blockText">
            <a href="/cart">CART</a>
            <p>Order dishes from your cart (in one click)</p>
          </div>
        </div>
        <div className="block">
          <a href="/client/orderHistory">
            <img alt="icon" src={icon3}></img>
          </a>
          <div className="blockText">
            <a href="/client/orderHistory">ORDER HISTORY </a>
            <p>See history of your orders</p>
          </div>
        </div>
        <div className="block">
          <a href="/client/current">
            <img alt="icon" src={icon3}></img>
          </a>
          <div className="blockText">
            <a href="/client/current">CURRENT DELIVERIES</a>
            <p>See currents deliveries</p>
          </div>
        </div>
        <div className="block">
          <button>
            <a href="/client/eventHistory">
              <img src={icon1} alt="icon"></img>
            </a>
          </button>
          <div className="blockText">
            <a className="modalTextClient" href="/client/eventHistory">
              EVENT
            </a>
            <p>Watch information about your events.</p>
          </div>
        </div>
        <div className="block">
          <a href="/client/addReview">
            <img alt="icon" src={icon4}></img>
          </a>
          <div className="blockText">
            <a href="/client/addReview">ADD REVIEW</a>
            <p>Add review to completed deliveries.</p>
          </div>
        </div>
      </div>
      <button
        variant="contained"
        className="backToHome"
        onClick={handleToggleLogoutModal}
      >
        Back to home
      </button>
      <LogoutModal
        open={openLogoutModal}
        handleClose={handleToggleLogoutModal}
        onLogout={handleLogOut}
      />
    </div>
  );
};

export default ClientMain;
