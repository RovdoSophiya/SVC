import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  fetchCourierById,
  checkPhoneExists,
  updateCourier,
} from "../../../../api/courierApi/courierApi";

const EditCourierModal = ({ open, onClose }) => {
  const [courierData, setCourierData] = useState(null);
  const [lastname, setLastname] = useState("");
  const [name, setName] = useState("");
  const [fathername, setFathername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicletype, setVehicletype] = useState("");
  const [available, setAvailability] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const courierId = localStorage.getItem("id");

  useEffect(() => {
    const fetchCourierData = async () => {
      if (!open) return;

      const { data } = await fetchCourierById(courierId);
      if (data) {
        setCourierData(data);
        setLastname(data.lastname);
        setName(data.name);
        setFathername(data.fathername || "");
        setEmail(data.email);
        setPhone(data.phone);
        setVehicletype(data.vehicletype || "");
        setAvailability(data.available || false);
      }
    };

    fetchCourierData();
  }, [courierId, open]);

  const handleApply = async () => {
    if (!lastname || !name || !vehicletype) {
      setSnackbarMessage("Last name, name, and vehicle type cannot be empty.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (/[^0-9]/.test(phone)) {
      setSnackbarMessage("The phone number must contain only numbers.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (password) {
      if (password.length < 5) {
        setSnackbarMessage("Password must be longer than 6 characters.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      if (/[^a-zA-Z0-9]/.test(password)) {
        setSnackbarMessage("Password cannot contain special characters.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      if (password !== confirmPassword) {
        setSnackbarMessage("The passwords do not match.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
    }

    const { data: phoneExists } = await checkPhoneExists(phone, courierId);
    if (phoneExists) {
      setSnackbarMessage("This phone number already exists.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const { message } = await updateCourier(courierId, {
      lastname,
      name,
      fathername,
      email,
      phone,
      vehicletype,
      available,
      ...(password && { password }),
    });

    setPassword("");
    setConfirmPassword("");
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleReset = () => {
    if (courierData) {
      setLastname(courierData.lastname);
      setName(courierData.name);
      setFathername(courierData.fathername || "");
      setEmail(courierData.email);
      setPhone(courierData.phone);
      setVehicletype(courierData.vehicletype || "");
      setAvailability(courierData.available || false);
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "500px",
        margin: "auto",
        "@media(max-width:520px)": { width: 300 },
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          padding: "7px",
          margin: "auto",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", color: "rgba(128, 96, 68, 1)" }}
        >
          Editing Courier Information
        </Typography>
        <TextField
          label="Last name"
          fullWidth
          margin="normal"
          value={lastname}
          sx={{ color: "rgba(128, 96, 68, 1)" }}
          onChange={(e) => setLastname(e.target.value)}
        />
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          sx={{ color: "rgba(128, 96, 68, 1)" }}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Father name"
          fullWidth
          margin="normal"
          value={fathername}
          sx={{ color: "rgba(128, 96, 68, 1)" }}
          onChange={(e) => setFathername(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          sx={{ color: "rgba(128, 96, 68, 1)" }}
          disabled
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          value={phone}
          sx={{ color: "rgba(128, 96, 68, 1)" }}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Vehicle Type"
          fullWidth
          margin="normal"
          value={vehicletype}
          sx={{ color: "rgba(128, 96, 68, 1)" }}
          onChange={(e) => setVehicletype(e.target.value)}
        />
        <FormControlLabel
          control={
            <Switch
              checked={available}
              onChange={(e) => setAvailability(e.target.checked)}
            />
          }
          label="Available"
          sx={{ margin: "10px 0" }}
        />
        <TextField
          label="New password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          sx={{ color: "rgba(128, 96, 68, 1)" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          sx={{ color: "rgba(128, 96, 68, 1)" }}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleApply}
          sx={{ backgroundColor: "rgba(128, 96, 68, 1)" }}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          style={{
            marginLeft: "10px",
            color: "rgba(128, 96, 68, 1)",
            borderColor: "rgba(128, 96, 68, 1)",
          }}
        >
          Reset
        </Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default EditCourierModal;
