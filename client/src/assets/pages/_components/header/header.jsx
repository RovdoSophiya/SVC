import React, { Component } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header>
      <Box className="annotation">NEXT DAY DELIVERY, MINIMUM $100 + GST</Box>
      <Box></Box>
      <Box className="line"></Box>
      </header>
  )
}