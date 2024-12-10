import React from "react";
import { Container } from "@mui/material";
import "./parisCup.css";
import parisCup from "../../../img/paris_cup.png";

const MelbourneCup = () => {
  return (
    <Container
      sx={{
        paddingLeft: "0 !important",
        paddingRight: "0 !important",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "none !important",
        "@media (max-width:767px)": {
          flexDirection: "column-reverse",
        },
      }}
    >
      <div className="parisText">
        <p className="dynamic-text">Paris Cup</p>
        <p>is racing soon</p>
        <p>Show our finger food platters!</p>
        <a className="shopButton" href="/dishes">
          <p className="shopNow">SHOP NOW</p>
        </a>
      </div>
      <div className="parisPhoto">
        <img src={parisCup} alt="Cup"></img>
      </div>
    </Container>
  );
};
export default MelbourneCup;
