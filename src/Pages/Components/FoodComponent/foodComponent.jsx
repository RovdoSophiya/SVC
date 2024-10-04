import React from "react";
import { Link } from "@mui/material";
import Food from "../../../assets/img/food.jpg";
import "./foodComponent.css";

export default function foodComponent() {
  return (
    <div className="foodComponent">
      <div className="foodComponent-annotation">
        <p>We make food from heart</p>
        <p>
          {" "}
          We have been in the catering business for 10 years, providing
          exceptional services to our clients. Our passion for food and
          commitment to quality have helped us grow and thrive in this
          competitive industry. As we look to the future, we are dedicated to
          further expanding our offerings and enhancing our services to meet
          your needs. Your satisfaction is our priority, and we are excited to
          continue this journey with you!
        </p>
        <Link to="/">About us</Link>
      </div>
      <div className="foodComponent-photo">
        <img src={Food} alt="Food"></img>
      </div>
    </div>
  );
}
