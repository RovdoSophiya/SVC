import React, { useState } from "react";
import "./eventForm.css";
import { addEvent } from "../../../api/eventApi/eventApi";
import { Modal, Box, Button, Typography } from "@mui/material";

const Form = () => {
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [text, setText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = localStorage.getItem("role");

    if (role !== "client") {
      setModalMessage("Please log in as a client to reserve an event.");
      setModalOpen(true);
      return;
    }

    try {
      await addEvent({ phone, date, address, text });
      setModalMessage(
        "Event successfully booked! You can view details in your profile."
      );
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setModalMessage("The selected date is already booked.");
      } else {
        setModalMessage("An error occurred while booking the event.");
      }
    } finally {
      setModalOpen(true);
    }
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            p: 4,
            borderRadius: 2,
            "@media (max-width:500px)": {
              width: 280,
              padding: "20px!important",
            },
          }}
        >
          <Typography variant="h6" component="h2">
            Notification
          </Typography>
          <Typography sx={{ mt: 2 }}>{modalMessage}</Typography>
          <Button
            onClick={() => setModalOpen(false)}
            variant="contained"
            sx={{
              backgroundColor: "#806044",
              color: "white",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "#483728",
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Form;
