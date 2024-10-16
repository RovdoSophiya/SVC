import React, { Component } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./header.css";
import "../../../src/change-theme.css";
import logo from "../../../src/assets/img/Logo.png";
import darkThemeIcon from "../../../src/assets/img/Dark-theme.png";
import lightThemeIcon from "../../../src/assets/img/Ligth-theme.png";
import userIcon from "../../../src/assets/img/User-icon.png";

class Header extends Component {
  render() {
    return (
      <header>
        <Box className="annotation">
          <Typography
            data-i18="shoppingAnnotation"
            className="shopping-annotation"
          >
            Free Shopping on US Orders Over $60
          </Typography>
        </Box>
        <Box className="header-menu">
          <Box className="menu">
            <Link className="menu-item" data-i18="main" to="/">
              Main
            </Link>
            <Link className="menu-item" data-i18="shop" to="/shop">
              Shop
            </Link>
            <Link className="menu-item" data-i18="story" to="/about">
              Our story
            </Link>
            <Link className="menu-item" data-i18="reviews" to="/reviews">
              Reviews
            </Link>
          </Box>
          <Box className="burger-menu">
            <Button className="burger-menu-btn">
              <span></span>
              <span></span>
              <span></span>
            </Button>
            <Box className="burger-menu-container">
              <ul className="menu-box">
                <li>
                  <Link className="menu-item-burger" data-i18="main" to="/">
                    Main
                  </Link>
                </li>
                <li>
                  <Link className="menu-item-burger" data-i18="shop" to="/shop">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    className="menu-item-burger"
                    data-i18="story"
                    to="/about"
                  >
                    Our story
                  </Link>
                </li>
                <li>
                  <Link
                    className="menu-item-burger"
                    data-i18="reviews"
                    to="/reviews"
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Box className="language-buttons-burger">
                    <Box className="lang-button">
                      <Button data-i18="rusB" className="rus">
                        Rus
                      </Button>
                    </Box>
                    <Box className="lang-button">
                      <Button
                        data-i18="enB"
                        className="en"
                        sx={{ color: "#b45f4d" }}
                      >
                        En
                      </Button>
                    </Box>
                  </Box>
                </li>
                <li>
                  <Box className="themes-burger">
                    <Button className="dark-menu-icon" id="darkTheme-burger">
                      <img src={darkThemeIcon} alt="Dark-icon" />
                    </Button>
                    <Button className="light-menu-icon" id="lightTheme-burger">
                      <img src={lightThemeIcon} alt="Light-icon" />
                    </Button>
                  </Box>
                </li>
              </ul>
            </Box>
          </Box>
          <Box className="menu-logo">
            <img className="logo" src={logo} alt="Logo" />
          </Box>
          <Box className="account">
            <Box className="language-buttons-and-themes">
              <Box className="language-buttons">
                <Box className="lang-button">
                  <Button data-i18="rus" className="rus">
                    Rus
                  </Button>
                </Box>
                <Box className="lang-button">
                  <Button data-i18="en" className="en">
                    En
                  </Button>
                </Box>
              </Box>
              <Box className="themes">
                <Button className="dark-menu-icon" id="darkTheme">
                  <img src={darkThemeIcon} alt="Dark-icon" />
                </Button>
                <Button className="light-menu-icon" id="lightTheme">
                  <img src={lightThemeIcon} alt="Light-icon" />
                </Button>
              </Box>
            </Box>
            <Box className="signs">
              <Link to="/authorization">
                <img src={userIcon} alt="User icon" />
              </Link>
            </Box>
          </Box>
        </Box>
      </header>
    );
  }
}

export default Header;
