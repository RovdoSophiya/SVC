import React, { useState } from "react";
import "./eventForm.css";

const Form = () => {
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="eventFormContainer">
      <p>
        Enquire today and an event specialist will be in touch to discuss your
        specific requirements
      </p>
      <form onSubmit={handleSubmit} className="formContainer">
        <div className="formGroup">
          <p>Phone Number*</p>
          <label htmlFor="phone"></label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <p>Event Date*</p>
          <label htmlFor="date"></label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="formGroupAddress">
          <p>Event Address (optional)</p>
          <label htmlFor="address"></label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="formGroupMessage">
          <p>Your Message*</p>
          <label htmlFor="text"></label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="eventButton">
          Send Enquiry
        </button>
      </form>
    </div>
  );
};

export default Form;
