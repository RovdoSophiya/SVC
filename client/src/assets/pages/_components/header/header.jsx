import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  TextField,
  useMediaQuery,
  Typography,
  Modal,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MapIcon from "@mui/icons-material/Map";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "@mui/material/Link";
import axios from "axios"; // Импортируем Axios
import "./header.css";
import Logo from "../../../img/logo.png";
import ProfileModal from "../modal/profileModal/profileModal";

const Header = ({ user, userRole, userId, loading }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [cartCount, setCartCount] = useState(0);
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

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(
        userRole === "client"
          ? `http://localhost:5000/api/clients/${userId}`
          : `http://localhost:5000/api/couriers/${userId}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userId, userRole]);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (userRole === "client") {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/carts/total/${userId}`
          );
          const count = response.data.total;
          return count;
        } catch (error) {
          console.error("Error fetching cart count:", error);
          return 0; // Возвращаем 0 в случае ошибки
        }
      }
    };
    const getCartCount = async () => {
      const count = await fetchCartCount();
      setCartCount(count);
    };

    getCartCount();
  }, [userRole, userId, fetchUserData]);

  useEffect(() => {
    if (openProfileModal) {
      fetchUserData();
    }
  }, [openProfileModal, fetchUserData]);

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
      <Divider />
      <Box
        className="cater-project"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <img
          className={`logo ${
            userRole === "client" || userRole === "courier" ? "logo-user" : ""
          }`}
          src={Logo}
          alt="Logo"
        />
        <div
          className={`search ${
            userRole === "client" || userRole === "courier" ? "search-user" : ""
          }`}
          style={{
            display:
              userRole === "client" || userRole === "courier" ? "none" : "flex",
          }}
        >
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
                  marginLeft: "-120px",
                },
                ...(userRole === "client" || userRole === "courier"
                  ? {
                      width: "80%",
                      "@media (max-width:1080px)": {
                        width: "400px",
                        marginLeft: "-120px",
                      },
                    }
                  : {}),
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

        <div
          className={`authorization ${
            userRole === "client" || userRole === "courier" ? "highlight" : ""
          }`}
        >
          {loading ? (
            <p>Loading...</p>
          ) : userRole === "client" || userRole === "courier" ? (
            <>
              <p>Welcome, {user ? user.name : "Guest"}</p>
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
            <a
              href="/login"
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              Login/SignUp
            </a>
          )}
        </div>
        <div className="icons">
          <IconButton onClick={handleToggleModal} sx={{ color: "white" }}>
            <MapIcon />
          </IconButton>
          {isSmallScreen && userRole !== "courier" && (
            <IconButton onClick={handleToggleSearch} sx={{ color: "white" }}>
              <SearchIcon />
            </IconButton>
          )}
          <IconButton
            onClick={() => {
              if (userRole === "client" || userRole === "courier") {
                handleToggleProfileModal();
              } else {
                navigate("/login");
              }
            }}
            sx={{ color: "white" }}
          >
            <PersonIcon />
          </IconButton>
        </div>
        {userRole === "client" && (
          <IconButton sx={{ color: "white" }}>
            <ShoppingCartIcon />
            <span>{cartCount}</span>
          </IconButton>
        )}
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
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location of Paris"
            ></iframe>
          </Box>
        </Box>
      </Modal>

      {/* Модальное окно для профиля */}
      <ProfileModal
        openProfileModal={openProfileModal}
        handleToggleProfileModal={handleToggleProfileModal}
        userData={userData}
        setUserData={setUserData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        fetchUserData={fetchUserData}
        userRole={userRole}
        userId={userId}
        errors={errors}
        setErrors={setErrors}
      />
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
              href="/"
              underline="hover"
              color="rgba(128, 96, 68, 1)"
            >
              Main
            </Link>
            <Link
              className="list-item"
              href="/dishes"
              underline="hover"
              color="rgba(128, 96, 68, 1)"
            >
              Dishes
            </Link>
            <Link
              className="list-item"
              href="/reviews"
              underline="hover"
              color="rgba(128, 96, 68, 1)"
            >
              Reviews
            </Link>
            <Link
              className="list-item"
              href="#"
              underline="hover"
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
