import React, { useState } from "react";
import { registerUser } from "../../../api/auth/authApi";
import { useNavigate } from "react-router-dom";
import "./registration.css";
import Cookies from "js-cookie";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastname: "",
    name: "",
    fatername: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "lastname":
        if (!value) error = "Last name is required.";
        break;
      case "name":
        if (!value) error = "First name is required.";
        break;
      case "phone":
        if (!value) {
          error = "Phone is required.";
        } else if (!/^\d+$/.test(value)) {
          error = "Phone number must contain only digits.";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required.";
        } else {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) error = "Invalid email format.";
        }
        break;
      case "address":
        if (!value) error = "Address is required.";
        break;
      case "password":
        if (!value) {
          error = "Password is required.";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters.";
        }
        break;
      case "confirmpassword":
        if (!value) {
          error = "Confirm password is required.";
        } else if (value !== formData.password) {
          error = "Passwords do not match.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Валидация форм
    Object.keys(formData).forEach((field) =>
      validateField(field, formData[field])
    );

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    const result = await registerUser(formData);

    if (result.error) {
      const message = result.error;
      if (message.includes("Email already exists")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email already exists",
        }));
      } else if (message.includes("Phone already exists")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Phone already exists",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          submit: message || "Registration failed",
        }));
      }
      return;
    }

    const { accessToken, refreshToken, user } = result.data;
    localStorage.setItem("id", user.id);
    localStorage.setItem("role", "client");
    localStorage.setItem("accessToken", accessToken);
    Cookies.set("refreshToken", refreshToken, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });

    setFormData({
      name: "",
      lastname: "",
      fathername: "",
      phone: "",
      email: "",
      address: "",
      password: "",
      confirmpassword: "",
    });
    setTimeout(() => {
      navigate("/client");
    }, 2000);
  };

  return (
    <div className="registrationContainer">
      <form className="registrationForm" onSubmit={handleSubmit}>
        <div className="contactDetails">
          <div className="divContact">
            <p>Contact Details</p>
          </div>
          <div className="inputs">
            <div className="inputBlock">
              <p>Last Name*</p>{" "}
              <input
                type="text"
                name="lastname"
                className="contactinput"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
            <div className="inputBlock">
              {" "}
              <p>First Name*</p>
              <input
                type="text"
                name="name"
                className="contactinput"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>
            <div className="inputBlock">
              {" "}
              <p>Father Name</p>
              <input
                type="text"
                name="fathername"
                className="contactinput"
                value={formData.middlename}
                onChange={handleChange}
              />
            </div>
            <div className="inputBlock">
              {" "}
              <p>Phone*</p>{" "}
              <input
                type="text"
                name="phone"
                className="contactinput"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <div className="inputBlock">
              <p>Email*</p>{" "}
              <input
                type="email"
                name="email"
                className="contactinput"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
          </div>
        </div>
        <div className="address">
          <div className="divAddress">
            <p>Address</p>
          </div>
          <div className="addressBlock">
            {" "}
            <p>Address*</p>{" "}
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
        </div>
        <div className="account">
          <div className="divAccount">
            <p>Account</p>
          </div>
          <div className="accountBlock">
            <div className="accountBlock-item">
              <p>Password*</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="accountBlock-item">
              {" "}
              <p>Confirm password*</p>
              <input
                type="password"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                required
              />
              {errors.confirmpassword && (
                <p className="error">{errors.confirmpassword}</p>
              )}
            </div>
          </div>
        </div>
        <div className="buttons">
          {" "}
          <button type="submit">Create account</button>
          <div>
            <a href="/login">Cancel</a>
          </div>
        </div>
      </form>
      {errors.submit && <p className="error">{errors.submit}</p>}
    </div>
  );
};

export default Registration;
