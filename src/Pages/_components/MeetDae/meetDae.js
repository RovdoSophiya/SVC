import React, { Component } from "react";
import "./meet-dae.css";
import firstGirl from "../../../assets/img/First-girl.png";
import secondGirl from "../../../assets/img/Second-girl.png";

const MeetDae =({ annotation, description })=> {

    return (
      <section className="meet-dae">
        <img className="first-girl" src={firstGirl} alt="First girl" />
        <img className="second-girl" src={secondGirl} alt="Second girl" />
        <div className="Dae-annotation-text">
          <p data-i18="meetDae" className="Dae-line">
            {annotation}
          </p>
          <p data-i18="textDae" className="Dae-text">
            {description}
          </p>
          <button data-i18="learnMore" className="Learn-more open-modal">
            Read More
          </button>
        </div>
      </section>
    );
  }

export default MeetDae;
