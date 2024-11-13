import React, { useState } from "react";
import "./courier.css";
import icon1 from "../../../img/icons/user.png";
import icon2 from "../../../img/icons/order.png";
import icon3 from "../../../img/icons/book.png";
import icon4 from "../../../img/icons/delivery.png";
import LogoutModal from "../modal/exitAccountModal/logoutModal";

const CourierMain = (user, userRole, userId, loading) => {
  /*Модальное окно для выхода*/
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const handleToggleLogoutModal = () => {
    setOpenLogoutModal((prev) => !prev);
  };

  return (
    <div>
      <div className="courierContainer">
        <div className="block-courier">
          <button>
            <img src={icon1} alt="icon"></img>
          </button>
          <div className="blockText-courier">
            <p className="modalTextCourier">INFORMATION</p>
            <p>Watch information about your account</p>
          </div>
        </div>
        <div className="block-courier">
          <a href="/courier/availableDeliveries">
            <img alt="icon" src={icon2}></img>
          </a>
          <div className="blockText-courier">
            <a href="/courier/availableDeliveries">AVAILABLE dELIVERIES</a>
            <p>Watch all available deliveries</p>
          </div>
        </div>
        <div className="block-courier">
          <a href="/courier/currentDeliveries">
            <img alt="icon" src={icon4}></img>
          </a>
          <div className="blockText-courier">
            <a href="/courier/currentDeliveries">CURRENT DELIVERIES</a>
            <p>See all your current deliveries</p>
          </div>
        </div>
        <div className="block-courier">
          <a href="/courier/deliveryHistory">
            <img alt="icon" src={icon3}></img>
          </a>
          <div className="blockText-courier">
            <a href="/courier/deliveryHistory">HISTORY OF DELIVERS</a>
            <p>See history of your delivers(with downloading)</p>
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

export default CourierMain;
