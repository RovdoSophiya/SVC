import React, { Component } from "react";
import "./green-menu.css";
const GreenMenu = () => {
  const greenMenuTexts = [
    "READY TO GET DRENCHED?",
    "Meet Monsoon Moisture Mask",
    "Shop Now",
  ];

  return (
    <section className="green-menu">
      <p data-i18="greenMenuText1" className="green-menu-text1">
        {greenMenuTexts[0]} {/* READY TO GET DRENCHED? */}
      </p>
      <p data-i18="greenMenuText2" className="green-menu-text2">
        {greenMenuTexts[1]} {/* Meet Monsoon Moisture Mask */}
      </p>
      <p data-i18="greenMenuText3" className="green-menu-text3">
        {greenMenuTexts[2]} {/* Shop Now */}
      </p>
    </section>
  );
};

export default GreenMenu;
