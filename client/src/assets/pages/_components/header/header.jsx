import React, { Component } from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import "./header.css";

const Header = () => {
  return (
    <header>
      <Box className="annotation">
        <p>NEXT DAY DELIVERY, MINIMUM $100 + GST</p>
      </Box>
      <Box className="line"></Box>
      <Box className="cater-project">
        <div className="logo"></div>
      </Box>
      <Box className="header">
        <div className="list">
          <Link className="list-item" href="#" underline="hover" color="white">
            {"Dishes"}
          </Link>
          <Link className="list-item" href="#" underline="hover" color="white">
            {"Reviews"}
          </Link>
          <Link className="list-item" href="#" underline="hover" color="white">
            {"Events"}
          </Link>
          <Link className="list-item" href="#" underline="hover" color="white">
            {"Map"}
          </Link>
        </div>

        <div></div>
      </Box>
    </header>
  );
};

export default Header;
