import React, { Component } from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="line"></div>
      <div className="footer-info">
        <div className="links-and-email">
          <div className="link-block">
            <div className="first-links-block">
              <a data-i18="sustainability" className="link">
                Sustainability
              </a>
              <a data-i18="contactUs" className="link">
                Contact Us
              </a>
              <a data-i18="FAQ" className="link">
                FAQ
              </a>
              <a data-i18="careers" className="link">
                Careers
              </a>
            </div>
            <div className="second-links-block">
              <a data-i18="privacyPolicy" className="link">
                Privacy Policy
              </a>
              <a data-i18="CAPrivacyRights" className="link">
                CA Privacy Rights
              </a>
              <a data-i18="termsOfUse" className="link">
                Terms of Use
              </a>
              <a data-i18="newsletter" className="link">
                Newsletter
              </a>
            </div>
          </div>

          <div className="email-block">
            <p data-i18="firstEmailText" className="first-email-text">
              ONLY GOOD HAIR DAES AHEAD—AND 10% OFF YOUR FIRST ORDER
            </p>
            <div className="email">
              <div className="email-field">
                <input
                  type="email"
                  className="email-input"
                  placeholder="Enter your email"
                />
              </div>
              <button data-i18="subscribe" className="subscribe open-popup">
                Subscribe
              </button>
            </div>
            <p data-i18="underEmailText" className="under-email-text">
              Want to shop in person? Swing by our showroom.
            </p>
            <p data-i18="address" className="under-email-text">
              M-F, 10am-2pm 5051 E Indigo St, Suite 105, Mesa, AZ 85205
            </p>
          </div>
        </div>
      </div>
      <div className="rights">
        <p data-i18="rights">© 2021 dae. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
