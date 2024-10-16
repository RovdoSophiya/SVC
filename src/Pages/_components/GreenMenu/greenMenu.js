import React from "react";
import "./green-menu.css";
import { Button, Divider, Container, Paper } from "@mui/material";
const GreenMenu = () => {
  const texts = [
    "READY TO GET DRENCHED?",
    "Meet Monsoon Moisture Mask",
    "Shop Now",
  ];
  return (
    <Paper
      elevation={3}
      className="green-menu"
      sx={{ backgroundColor: "#a9ae8d" }}
    >
      <Container>
        <h2
          data-i18="greenMenuText1"
          className="green-menu-text1"
          sx={{ color: "#f6f4ec" }}
        >
          {texts[0]}
        </h2>
        <Divider className="divider" />
        <h3
          data-i18="greenMenuText2"
          className="green-menu-text2"
          sx={{ color: "#f6f4ec" }}
        >
          {texts[1]} {/* Meet Monsoon Moisture Mask */}
        </h3>
        <Button
          variant="contained"
          color="primary"
          data-i18="greenMenuText3"
          className="green-menu-text3"
          href="#"
          sx={{
            borderRadius: "none",
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
        >
          {texts[2]} {/* Shop Now */}
        </Button>
      </Container>
    </Paper>
  );
};

export default GreenMenu;
