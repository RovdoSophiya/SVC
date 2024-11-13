import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  IconButton,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const ProfileModal = ({ openProfileModal, userRole, userId }) => {
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    fathername: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch user data when modal opens (for example)
  useEffect(() => {
    const fetchUserData = async () => {
      const url =
        userRole === "client"
          ? `http://localhost:5000/api/clients/${userId}`
          : `http://localhost:5000/api/couriers/${userId}`;

      try {
        const response = await axios.get(url);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (openProfileModal) {
      fetchUserData();
    }
  }, [openProfileModal, userRole, userId]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    await validateForm();
  };

  const validateForm = async () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;
    const phoneRegex = /^\d+$/;

    if (!userData.name) newErrors.name = "Name is required";
    else if (!nameRegex.test(userData.name))
      newErrors.name = "Name must contain only letters";

    if (!userData.lastname) newErrors.lastname = "Lastname is required";
    else if (!nameRegex.test(userData.lastname))
      newErrors.lastname = "Lastname must contain only letters";

    if (!nameRegex.test(userData.fathername))
      newErrors.fathername = "Fathername must contain only letters";

    if (!userData.phone) newErrors.phone = "Phone is required";
    else if (!phoneRegex.test(userData.phone))
      newErrors.phone = "Phone must contain only numbers";

    if (!userData.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    const url =
      userRole === "client"
        ? `http://localhost:5000/api/clients/${userId}`
        : `http://localhost:5000/api/couriers/${userId}`;

    try {
      const response = await axios.put(url, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setIsEditing(false);
        // Optionally refetch user data here
      } else {
        console.error("Error saving data");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <Modal open={openProfileModal} onClose={() => setIsEditing(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          width: "80%",
          maxWidth: "600px",
          color: "rgba(128, 96, 68, 1)",
        }}
      >
        <IconButton
          onClick={() => setIsEditing(false)}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2">
          {userRole === "client" ? "Client Profile" : "Courier Profile"}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={userData.name || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Lastname"
            name="lastname"
            value={userData.lastname || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.lastname}
            helperText={errors.lastname}
          />
          <TextField
            label="Fathername"
            name="fathername"
            value={userData.fathername || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.fathername}
            helperText={errors.fathername}
          />
          <TextField
            label="Phone"
            name="phone"
            value={userData.phone || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            label="Address"
            name="address"
            value={userData.address || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.address}
            helperText={errors.address}
          />
          <Button
            variant="contained"
            onClick={() => setIsEditing((prev) => !prev)}
            sx={{ mr: 2 }}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing && (
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={Object.keys(errors).length > 0}
            >
              Save
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
