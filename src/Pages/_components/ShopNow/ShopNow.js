import React, { Component } from "react";
import "./photo-section.css";
import Modal from "../Modal/Modal";
import { useState } from "react";

const ShopNow = ({ text }) => {
  /*состояние, отвечающее за видимость модального окна */
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      <section className="photo-section">
        <div className="shop-now-container">
          <div className="shop-now">
            <button className="shop-text" onClick={() => setModalActive(true)}>
              {text}
            </button>
          </div>
        </div>
      </section>
      <Modal active={modalActive} setActive={setModalActive} />
    </>
  );
};
export default ShopNow;
