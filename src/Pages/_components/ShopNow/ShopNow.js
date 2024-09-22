import React, { Component } from "react";
import "./photo-section.css";

const ShopNow = ({ text }) => {
  return (
    <section className="photo-section">
      <div className="shop-now-container">
        <div className="shop-now">
          <a data-i18="shopText" className="shop-text" href="#">
            {text}
          </a>
        </div>
      </div>
    </section>
  );
};
export default ShopNow;
