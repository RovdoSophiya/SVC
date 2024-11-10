import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  IconButton,
  TextField,
  useMediaQuery,
  Typography,
  Modal,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MapIcon from "@mui/icons-material/Map";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "@mui/material/Link";
import "./header.css";
import Logo from "../../../img/logo.png";

const Header = ({ user, userRole, cartCount }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();

  const handleToggleSearch = () => {
    setOpenSearch((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setOpenSearch(false);
    }
  };

  useEffect(() => {
    if (openSearch) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSearch]);

  const handleToggleProfileModal = () => {
    setOpenProfileModal((prev) => !prev);
  };

  const fetchUserData = async () => {
    const response = await fetch(`/api/users/${user.id}`); // Подставьте правильный URL
    const data = await response.json();
    setUserData(data);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const response = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      // Обновление прошло успешно
      setIsEditing(false);
      fetchUserData(); // Обновляем данные пользователя
    } else {
      // Обработка ошибок
      console.error("Ошибка при сохранении данных");
    }
  };

  useEffect(() => {
    if (openProfileModal) {
      fetchUserData();
    }
  }, [openProfileModal]);

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <header>
      <Box
        className="annotation"
        sx={{
          width: "100%",
          height: "42px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>NEXT DAY DELIVERY, MINIMUM $100 + GST</p>
      </Box>
      <Box
        className="cater-project"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <img className="logo" src={Logo} alt="Logo" />
        <div className="search">
          {(!isSmallScreen || openSearch) && (
            <Box
              ref={inputRef}
              sx={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                width: "60%",
                zIndex: 1,
                backgroundColor: "rgba(128, 96, 68, 1)",
                "@media (max-width:1080px)": {
                  width: "400px",
                  marginLeft: "-100px",
                },
                "@media (max-width:834px)": {
                  width: "300px",
                  marginLeft: "-100px",
                },
                "@media (max-width:505px)": {
                  width: "200px",
                  marginLeft: "-170px",
                },
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{
                  marginRight: "8px",
                  width: "90%",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "white",
                    opacity: 1,
                  },
                }}
              />
              <IconButton onClick={handleToggleSearch} sx={{ color: "white" }}>
                <SearchIcon />
              </IconButton>
            </Box>
          )}
        </div>
        <div className="authorization">
          {user ? (
            <>
              <p>Welcome, {user.name}</p>
              <Link
                className="gotoAuthorization"
                onClick={handleToggleProfileModal}
                underline="hover"
                color="white"
              >
                My account
              </Link>
            </>
          ) : (
            <p>Login/SignUp</p>
          )}
        </div>
        <div className="icons">
          <IconButton onClick={handleToggleModal} sx={{ color: "white" }}>
            <MapIcon />
          </IconButton>
          {isSmallScreen && (
            <IconButton onClick={handleToggleSearch} sx={{ color: "white" }}>
              <SearchIcon />
            </IconButton>
          )}
          <IconButton
            onClick={() => navigate("/login")}
            sx={{ color: "white" }}
          >
            <PersonIcon />
          </IconButton>
          {userRole === "client" && (
            <IconButton sx={{ color: "white" }}>
              <ShoppingCartIcon />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "red",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </IconButton>
          )}
        </div>
      </Box>

      {/* Модальное окно для карты */}
      <Modal open={openModal} onClose={handleCloseModal}>
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
            onClick={handleCloseModal}
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
              allowFullЫcreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location of Paris"
            ></iframe>
          </Box>
        </Box>
      </Modal>

      {/* Модальное окно для профиля */}
      <Modal open={openProfileModal} onClose={handleToggleProfileModal}>
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
            onClick={handleToggleProfileModal}
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
            />
            <TextField
              label="Lastname"
              name="lastname"
              value={userData.lastname || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={userData.phone || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Address"
              name="address"
              value={userData.address || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleEditToggle}
              sx={{ mr: 2 }}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && (
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
      {userRole !== "courier" && (
        <Box
          className="header"
          sx={{
            width: "100%",
            height: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <div className="list">
            <Link
              className="list-item"
              href="#"
              underline="hover"
              color="rgba(128, 96, 68, 1)"
            >
              Main
            </Link>
            <Link
              className="list-item"
              href="#"
              underline="hover"
              color="rgba(128, 96, 68, 1)"
            >
              Dishes
            </Link>
            <Link
              className="list-item"
              href="#"
              underline="hover"
              color="rgba(128, 96, 68, 1)"
            >
              Reviews
            </Link>
            <Link
              className="list-item"
              href="#"
              underline="hover"
              c
              color="rgba(128, 96, 68, 1)"
            >
              Events
            </Link>
            <Link
              className="list-item"
              underline="hover"
              onClick={handleToggleModal}
              color="rgba(128, 96, 68, 1)"
              sx={{
                "@media (max-width:700px)": {
                  display: "none",
                },
              }}
            >
              Map
            </Link>
          </div>
        </Box>
      )}
    </header>
  );
};

export default Header;
