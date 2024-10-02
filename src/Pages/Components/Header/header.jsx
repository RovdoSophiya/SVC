import React from "react";
import "./header.css";
import { Container } from "@mui/material";
import { Link } from "@mui/material";

export default function Header() {
  return (
    <header>
      <Container className="header-menu">
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
              <Link href="/" className="main link">
                {"Main"}
              </Link>
            </li>
            <li className="menu-item about">
              <Link href="/about" className="about link">
                {"Our story"}
              </Link>
            </li>
            <li className="menu-item reviews">
              <Link href="/reviews" className="review link">
                {"Reviews"}
              </Link>
            </li>
            <li className="menu-item contacts">
              <Link href="/contacts" className="contact link">
                {"Contacts"}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="welcome">
          <Link href="/welcome" className="welcome-text">
            We happy to see you!
          </Link>
        </div>
      </Container>
      <div className="restaurant">
        <p>FEEL GOOD ABOUT YOUR FOOD!</p>
      </div>
    </header>
  );
}
