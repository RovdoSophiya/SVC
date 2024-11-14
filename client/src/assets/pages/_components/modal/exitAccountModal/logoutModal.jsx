import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ open, handleClose, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
          maxWidth: "400px",
          color: "rgba(128, 96, 68, 1)",
        }}
      >
        <IconButton
          onClick={handleClose}
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
          Exit from account
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Are you sure that you want to exit?
        </Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{ backgroundColor: "rgba(128, 96, 68, 1)" }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: "rgba(128, 96, 68, 1)",
              borderColor: "rgba(128, 96, 68, 1)",
            }}
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
