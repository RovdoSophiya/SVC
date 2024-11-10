import React from "react";
import Logo from "../../../img/logo.png";
import "./footer.css";
import Facebook from "../../../img/icons/facebook.svg";
import Instagram from "../../../img/icons/instagram.svg";
import Link from "../../../img/icons/link.svg";
import Card1 from "../../../img/pay/pay1.png";
import Card2 from "../../../img/pay/pay2.png";
import Card3 from "../../../img/pay/pay3.png";
import Card4 from "../../../img/pay/pay4.png";

const Footer = () => {
  return (
    <footer>
      <div className="listItems">
        <div className="footerItem1">
          <img src={Logo} alt="Logo" style={{ width: "200px" }}></img>
          <p>IT'S ALL IN DETAILS</p>
          <p>EMAIL: catering@gmail.com</p>
          <p style={{ color: "rgb(234, 186, 144)" }}>Paris | France</p>
        </div>
        <div className="footerItem2">
          <p style={{ fontSize: "20px" }}>Legal</p>
          <p>Orders & Shipping Policy</p>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Refund Policy</p>
        </div>
        <div className="footerItem3">
          <p style={{ fontSize: "20px" }}>Newsletter</p>
          <p className="footerItemannotation">
            Subscribe to receive delicious weekly updates, access to exclusive
            deals, and more.
          </p>
          <input
            type="email"
            placeholder="Email..."
            className="emailInput"
          ></input>
          <button>Subscribe</button>
        </div>
      </div>
      <div className="following">
        <div className="followingItem1">© Catering Project</div>
        <div className="followingItem2">
          <p>Follow Us</p>
          <div>
            <a href="https://www.facebook.com">
              <img src={Facebook} alt="facebook"></img>
            </a>
            <a href="https://www.instagram.com">
              <img src={Instagram} alt="instagram"></img>
            </a>
            <a href="https://linkedin.com">
              <img src={Link} alt="linkedln"></img>
            </a>
          </div>
        </div>
        <div className="followingItem3">
          <p>We accept</p>
          <div>
            <img src={Card1} alt="card"></img>
            <img src={Card2} alt="card"></img>
            <img src={Card3} alt="card"></img>
            <img src={Card4} alt="card"></img>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
