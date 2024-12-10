import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Divider, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./header.css";
import Logo from "../../../img/logo.png";
import MapModal from "../../_components/modal/mapModal/mapModal";
import EditClientModal from "../../_components/modal/clientModal/clientModal";
import EditCourierModal from "../../_components/modal/courierModal/courierModal";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditCourierModal, setOpenEditCourierModal] = useState(false);
  const [openEditClientModal, setOpenEditClientModal] = useState(false);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const userid = localStorage.getItem("id");

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleToggleEditCourierModal = () => {
    setOpenEditCourierModal((prev) => !prev);
  };

  const handleToggleEditClientModal = () => {
    setOpenEditClientModal((prev) => !prev);
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
        ></div>

        <div
          className={`authorization ${
            userRole === "client" || userRole === "courier" ? "highlight" : ""
          }`}
        >
          {userRole === "client" || userRole === "courier" ? (
            <>
              <p>Welcome</p>
              <Link
                className="gotoAuthorization"
                onClick={
                  userRole === "client"
                    ? handleToggleEditClientModal
                    : handleToggleEditCourierModal
                }
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
          <IconButton
            onClick={() => {
              if (userRole === "client") {
                handleToggleEditClientModal();
              } else if (userRole === "courier") {
                handleToggleEditCourierModal();
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

      {userRole === "client" && (
        <EditClientModal
          clientId={userid}
          open={openEditClientModal}
          onClose={handleToggleEditClientModal}
        />
      )}
      {userRole === "courier" && (
        <EditCourierModal
          open={openEditCourierModal}
          onClose={handleToggleEditCourierModal}
        />
      )}
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
