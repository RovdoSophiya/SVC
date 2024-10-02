import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <header>
      <div className="header-menu">
        <div className="burger-menu">
          <div className="burger-icon">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
        <nav className="menu">
          <ul>
            <li className="menu-item main">
              <Link to="/" className="review-link">
                Main
              </Link>
            </li>
            <li className="menu-item about">
              <Link to="/about" className="review-link">
                About
              </Link>
            </li>
            <li className="menu-item reviews">
              <Link to="/reviews" className="review-link">
                Reviews
              </Link>
            </li>
            <li className="menu-item contacts">
              <Link to="/contacts" className="review-link">
                Contacts
              </Link>
            </li>
          </ul>
        </nav>
        <div className="welcome">
          <Link to="/" className="welcome-text">
            We happy to see you!
          </Link>
        </div>
      </div>
      <div className="restaurant">
        <p>FEEL GOOD ABOUT YOUR FOOD!</p>
      </div>
    </header>
  );
}
