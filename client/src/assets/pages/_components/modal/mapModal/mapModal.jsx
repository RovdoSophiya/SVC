import React from "react";
import { Box, Modal, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MapModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
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
          onClick={onClose}
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
          We are on the map
        </Typography>
        <Box sx={{ height: "400px", backgroundColor: "#e0e0e0", mt: 2 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.032174923079!2d2.3294471331254027!3d48.859195230523866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2z0J_QsNGA0LjQtiwg0KTRgNCw0L3RhtC40Y8!5e0!3m2!1sru!2sby!4v1731228723304!5m2!1sru!2sby"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location of Paris"
          ></iframe>
        </Box>
      </Box>
    </Modal>
  );
};

export default MapModal;
