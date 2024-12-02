import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  TextField,
  useMediaQuery,
  Typography,
  Modal,
  Divider,
  Link,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import MapIcon from "@mui/icons-material/Map";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./header.css";
import Logo from "../../../img/logo.png";
import MapModal from "../../_components/modal/mapModal/mapModal";

// import CourierInfoModal from "../../_components/modal/courierModal/courierModal";
// import { fetchCartCount } from "../../../api/cartApi/cartApi";

const Header = ({ user, loading }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const inputRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const userid = localStorage.getItem("id");

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

  /*Модальное окно для информации о курьере*/
  const handleToggleInfoModal = () => {
    setOpenInfoModal((prev) => !prev);
  };

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
            display: userRole === "courier" ? "none" : "flex",
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
          {userRole === "client" || userRole === "courier" ? (
            <>
              <p>Welcome, {user ? user.name : "Guest"}</p>
              <Link
                className="gotoAuthorization"
                onClick={handleToggleInfoModal}
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
                handleToggleInfoModal();
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
          <IconButton component={Link} href="/cart" sx={{ color: "white" }}>
            <ShoppingCartIcon />
          </IconButton>
        )}
      </Box>

      {/* Модальное окно для карты */}
      <MapModal open={openModal} onClose={handleToggleModal} />

      {/* Модальное окно для профиля
      <CourierInfoModal
        open={openInfoModal}
        onClose={handleToggleInfoModal}
        userId={userId}
      /> */}
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
              href={userRole === "client" ? "/client" : "/reviews"}
              underline="hover"
              color="rgba(128, 96, 68, 1)"
            >
              {userRole === "client" ? "Cabinet" : "Reviews"}
            </Link>
            <Link
              className="list-item"
              href="/event"
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
