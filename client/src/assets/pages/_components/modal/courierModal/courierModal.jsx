import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const CourierInfoModal = ({ open, onClose, userId }) => {
  const [courier, setCourier] = useState({
    lastname: "",
    name: "",
    fathername: "",
    phone: "",
    email: "",
    vehicletype: "",
    available: false,
  });
  const [originalCourier, setOriginalCourier] = useState({});
  const [errors, setErrors] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log(userId);
    if (userId) {
      axios
        .get(`http://localhost:5000/api/couriers/${userId}`)
        .then((response) => {
          const fetchedCourier = response.data;
          setCourier(fetchedCourier);
          setOriginalCourier(fetchedCourier);
        })
        .catch((error) => console.error("Error fetching courier data:", error));
    }
  }, [userId]);

  const validateFields = () => {
    const newErrors = {};
    if (!courier.name.trim()) newErrors.name = "Name is required.";
    if (!courier.lastname.trim()) newErrors.lastname = "Last name is required.";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!courier.email) {
      newErrors.email = "Valid email is required.";
    } else if (!emailPattern.test(courier.email)) {
      newErrors.email = "Invalid type of email.";
    }

    if (!/^\d+$/.test(courier.phone)) {
      newErrors.phone = "Phone must contain only digits.";
    } else if (!courier.phone) {
      newErrors.phone = "Invalid type of phone.";
    }

    if (newPassword) {
      if (!oldPassword) newErrors.oldPassword = "Enter old password to change.";
      if (newPassword !== confirmPassword)
        newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) return;
    const id = Number(userId);
    console.log(id);
    console.log(typeof id);
    try {
      const updates = { ...courier };
      if (newPassword) updates.password = newPassword;
      const response = await axios.put(
        `http://localhost:5000/api/couriers/${id}`,
        updates
      );
      if (response.status === 200) {
        setSnackbarOpen(true);
        onClose();
      }
    } catch (error) {
      console.error("Error updating courier:", error);
      setErrors({
        server: error.response?.data?.errors || "Failed to save changes.",
      });
    }
  };

  const handleCancel = () => {
    setCourier(originalCourier);
    setIsEditing(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          padding: 20,
          background: "white",
          borderRadius: 8,
          maxWidth: "90%",
          width: 400,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Edit Information</h2>
          <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
        </div>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={courier.name}
            onChange={(e) => setCourier({ ...courier, name: e.target.value })}
            disabled={!isEditing}
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.name}
            helperText={errors.name}
            margin="dense"
          />
          <TextField
            label="Last Name"
            value={courier.lastname}
            onChange={(e) =>
              setCourier({ ...courier, lastname: e.target.value })
            }
            error={!!errors.lastname}
            helperText={errors.lastname}
            fullWidth
            margin="dense"
            disabled={!isEditing}
          />
          <TextField
            label="Father Name"
            value={courier.fathername}
            onChange={(e) =>
              setCourier({ ...courier, fathername: e.target.value })
            }
            fullWidth
            margin="dense"
            disabled={!isEditing}
          />
          <TextField
            label="Email"
            type="email"
            value={courier.email}
            onChange={(e) => setCourier({ ...courier, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            margin="dense"
            disabled={!isEditing}
          />
          <TextField
            label="Phone"
            value={courier.phone}
            onChange={(e) => setCourier({ ...courier, phone: e.target.value })}
            error={!!errors.phone}
            helperText={errors.phone}
            fullWidth
            margin="dense"
            disabled={!isEditing}
          />
          <TextField
            label="Vehicle Type"
            value={courier.vehicletype}
            onChange={(e) =>
              setCourier({ ...courier, vehicletype: e.target.value })
            }
            fullWidth
            margin="dense"
            disabled={!isEditing}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={courier.available}
                onChange={(e) =>
                  setCourier({ ...courier, available: e.target.checked })
                }
                disabled={!isEditing}
              />
            }
            label="Available"
          />

          <h4>Change Password</h4>
          <TextField
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword}
            fullWidth
            margin="dense"
            disabled={!isEditing}
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            fullWidth
            margin="dense"
            disabled={!isEditing}
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            fullWidth
            margin="dense"
            disabled={!isEditing}
          />

          {errors.server && <p style={{ color: "red" }}>{errors.server}</p>}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
          >
            Change
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ marginLeft: 10 }}
            disabled={!isEditing}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            style={{ marginLeft: 10 }}
            disabled={!isEditing}
          >
            Cancel
          </Button>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Information successfully saved!
          </Alert>
        </Snackbar>
      </div>
    </Modal>
  );
};

export default CourierInfoModal;
