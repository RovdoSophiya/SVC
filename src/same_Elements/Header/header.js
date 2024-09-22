import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
import "./burger-nenu.css";
import logo from "../src/img/Logo.png";
import darkThemeIcon from "../src/img/Dark-theme.png";
import lightThemeIcon from "../src/img/Ligth-theme.png";
import userIcon from "../src/img/User-icon.png";

const Header = () => {
  return (
    <header>
      <div className="annotation">
        <p data-i18="shoppingAnnotation" className="shopping-annotation">
          Free Shopping on US Orders Over $60
        </p>
      </div>
      <div className="header-menu">
        <div className="menu">
          <Link to="/" className="menu-item" data-i18="main">
            Main
          </Link>
          <Link to="/" className="menu-item" data-i18="shop">
            Shop
          </Link>
          <Link to="/about" className="menu-item" data-i18="story">
            Our story
          </Link>
          <Link to="/reviews" className="menu-item" data-i18="reviews">
            Reviews
          </Link>
        </div>
        <div className="burger-menu">
          <button className="burger-menu-btn">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="burger-menu-container">
            <ul className="menu-box">
              <li>
                <Link to="/" className="menu-item-burger" data-i18="main">
                  Main
                </Link>
              </li>
              <li>
                <Link to="/" className="menu-item-burger" data-i18="shop">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="menu-item-burger" data-i18="story">
                  Our story
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="menu-item-burger"
                  data-i18="reviews"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <div className="language-buttons-burger">
                  <div className="lang-button">
                    <button data-i18="rusB" className="rus">
                      Rus
                    </button>
                  </div>
                  <div className="lang-button">
                    <button data-i18="enB" className="en">
                      En
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <div className="themes-burger">
                  <button className="dark-menu-icon" id="darkTheme-burger">
                    <img src={darkThemeIcon} alt="Dark-icon" />
                  </button>
                  <button className="light-menu-icon" id="lightTheme-burger">
                    <img src={lightThemeIcon} alt="Light-icon" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="menu-logo">
          <img className="logo" src={logo} alt="Logo" />
        </div>
        <div className="account">
          <div className="language-buttons-and-themes">
            <div className="language-buttons">
              <div className="lang-button">
                <button data-i18="rus" className="rus">
                  Rus
                </button>
              </div>
              <div className="lang-button">
                <button data-i18="en" className="en">
                  En
                </button>
              </div>
            </div>
            <div className="themes">
              <button className="dark-menu-icon" id="darkTheme">
                <img src={darkThemeIcon} alt="Dark-icon" />
              </button>
              <button className="light-menu-icon" id="lightTheme">
                <img src={lightThemeIcon} alt="Light-icon" />
              </button>
            </div>
          </div>
          <div className="signs">
            <a href="authorization.html">
              <img src={userIcon} alt="User icon" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
