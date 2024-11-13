import React, { useState } from "react";
import "./clientMain.css";
import icon1 from "../../../img/icons/user.png";
import icon2 from "../../../img/icons/order.png";
import icon3 from "../../../img/icons/book.png";
import icon4 from "../../../img/icons/review.png";
import LogoutModal from "../modal/exitAccountModal/logoutModal";

const ClientMain = (user, userRole, userId, loading) => {
  /*Модальное окно для выхода*/
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const handleToggleLogoutModal = () => {
    setOpenLogoutModal((prev) => !prev);
  };

  return (
    <div>
      <div className="clientContainer">
        <div className="block">
          <button>
            <img src={icon1} alt="icon"></img>
          </button>
          <div className="blockText">
            <p class="modalTextClient">INFORMATION</p>
            <p>Watch information about your account.</p>
          </div>
        </div>
        <div className="block">
          <a href="/cartOrder">
            <img alt="icon" src={icon2}></img>
          </a>
          <div className="blockText">
            <a href="/cartOrder">ORDER</a>
            <p>Order dishes from your cart (in one click)</p>
          </div>
        </div>
        <div className="block">
          <a href="/orderHistory">
            <img alt="icon" src={icon3}></img>
          </a>
          <div className="blockText">
            <a href="/orderHistory">ORDER HISTORY </a>
            <p>See history of your orders (with downloading)</p>
          </div>
        </div>
        <div className="block">
          <a href="/addReview">
            <img alt="icon" src={icon4}></img>
          </a>
          <div className="blockText">
            <a href="/addReview">ADD REVIEW</a>
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
      />
    </div>
  );
};

export default ClientMain;
