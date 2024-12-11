import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import ClientApi from "../../../../api/clients/clientApi";

const EditClientModal = ({ open, onClose }) => {
  const [clientData, setClientData] = useState(null);
  const [lastname, setLastname] = useState("");
  const [name, setName] = useState("");
  const [fathername, setFathername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const clientId = localStorage.getItem("id");

  useEffect(() => {
    const fetchClientData = async () => {
      if (!open) return;

      const { data } = await ClientApi.fetchClient(clientId);
      if (data) {
        setClientData(data);
        setLastname(data.lastname);
        setName(data.name);
        setFathername(data.fathername || "");
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address || "");
      }
    };

    fetchClientData();
  }, [clientId, open]);

  const handleApply = async () => {
    if (!lastname || !name) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Last name and name cannot be empty.");
      setSnackbarOpen(true);
      return;
    }

    if (/[^0-9]/.test(phone)) {
      setSnackbarSeverity("error");
      setSnackbarMessage("The phone number must contain only numbers.");
      setSnackbarOpen(true);
      return;
    }

    if (password) {
      if (password.length < 6) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Password must be longer than 6 characters.");
        setSnackbarOpen(true);
        return;
      }

      if (/[^a-zA-Z0-9]/.test(password)) {
        setSnackbarSeverity("error");
        setSnackbarMessage("Password cannot contain special characters.");
        setSnackbarOpen(true);
        return;
      }

      if (password !== confirmPassword) {
        setSnackbarSeverity("error");
        setSnackbarMessage("The passwords do not match.");
        setSnackbarOpen(true);
        return;
      }
    }

    const { data: phoneExists } = await ClientApi.checkPhoneExists(
      phone,
      clientId
    );
    if (phoneExists) {
      setSnackbarMessage("This phone number already exists.");
      setSnackbarOpen(true);
      return;
    }

    const { message } = await ClientApi.updateClient(clientId, {
      lastname,
      name,
      fathername,
      email,
      phone,
      address,
      ...(password && { password }),
    });

    setSnackbarSeverity("success");
    setPassword("");
    setConfirmPassword("");
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleReset = () => {
    if (clientData) {
      setLastname(clientData.lastname);
      setName(clientData.name);
      setFathername(clientData.fathername || "");
      setAddress(clientData.address || "");
      setPhone(clientData.phone);
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
          Editing customer information
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
          label="Address"
          fullWidth
          margin="normal"
          value={address}
          sx={{ color: "rgba(128, 96, 68, 1)" }}
          s
          onChange={(e) => setAddress(e.target.value)}
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

export default EditClientModal;
