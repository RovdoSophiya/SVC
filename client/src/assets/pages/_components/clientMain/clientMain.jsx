import React from "react";
import "./clientMain.css";
import icon1 from "../../../img/icons/user.png";
import icon2 from "../../../img/icons/order.png";
import icon3 from "../../../img/icons/book.png";
import icon4 from "../../../img/icons/review.png";
const ClientMain = () => {
  return (
    <div>
      <div className="clientContainer">
        <div className="block">
          <button>
            <img src={icon1} alt="icon"></img>
          </button>
          <div className="blockText">
            <p>INFORMATION</p>
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
          {" "}
          <a href="/orderHistory">
            <img alt="icon" src={icon3}></img>
          </a>
          <div className="blockText">
            <a href="/orderHistory">ORDER HISTORY </a>
            <p>See history of your orders (with downloading)</p>
          </div>
        </div>
        <div className="block">
          {" "}
          <img alt="icon" src={icon4}></img>
          <div className="blockText">
            <a href="/addReview">ADD REVIEW</a>
            <p>Add review to completed deliveries.</p>
          </div>
        </div>
      </div>
      <a href="/">Back to home</a>
    </div>
  );
};

export default ClientMain;
