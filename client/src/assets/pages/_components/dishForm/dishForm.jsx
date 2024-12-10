import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Drawer,
  Checkbox,
  FormControlLabel,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import { Menu as MenuIcon, KeyboardArrowUp } from "@mui/icons-material";
import { getDishes, getDishPhotoUrl } from "../../../api/dishApi/dishApi";
import { Link } from "react-router-dom";
import { addToCart } from "../../../api/cartApi/cartApi";

const DishComponent = () => {
  const [dishes, setDishes] = useState([]);
  const [filters, setFilters] = useState({
    types: [],
    isvegan: false,
    isglutenfree: false,
    isdietary: false,
  });
  const [cartQuantities, setCartQuantities] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchDishes = async () => {
      const queryParams = {
        types: filters.types,
        isvegan: filters.isvegan.toString(),
        isglutenfree: filters.isglutenfree.toString(),
        isdietary: filters.isdietary.toString(),
      };

      try {
        const data = await getDishes(queryParams);
        setDishes(data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, [filters]);

  const handleQuantityChange = (id, delta) => {
    setCartQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + delta, 1),
    }));
  };

  const handleAddToCart = async (dish) => {
    const role = localStorage.getItem("role");
    if (role !== "client") {
      setModalOpen(true);
      return;
    }

    const clientId = localStorage.getItem("id");
    const count = cartQuantities[dish.id] || 1;
    console.log("Adding to cart:", { clientId, dishId: dish.id, count });
    try {
      await addToCart(clientId, dish.id, count);
      setSnackbarMessage(`${dish.name} is added to cart!`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleTypeChange = (event) => {
    const { value, checked } = event.target;
    setFilters((prevFilters) => {
      const newTypes = checked
        ? [...prevFilters.types, value]
        : prevFilters.types.filter((type) => type !== value);
      return { ...prevFilters, types: newTypes };
    });
  };

  const resetFilters = () => {
    setFilters({
      types: [],
      isvegan: false,
      isglutenfree: false,
      isdietary: false,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ display: "flex", marginBottom: "60px" }}>
      <button
        onClick={toggleDrawer}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flexStart",
          backgroundColor: "transparent",
          border: "none",
          marginTop: "15px",
        }}
      >
        <MenuIcon sx={{ marginTop: "5px" }} />
        <p style={{ fontSize: "25px" }}>Filters</p>
      </button>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <div
          style={{
            width: 250,
            padding: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontSize: "25px" }}>
            Meal Type
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                value="Breakfast"
                checked={filters.types.includes("Breakfast")}
                onChange={handleTypeChange}
              />
            }
            label="Breakfast"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="Lunch"
                checked={filters.types.includes("Lunch")}
                onChange={handleTypeChange}
              />
            }
            label="Lunch"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="Dinner"
                checked={filters.types.includes("Dinner")}
                onChange={handleTypeChange}
              />
            }
            label="Dinner"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="All"
                checked={filters.types.includes("All")}
                onChange={handleTypeChange}
              />
            }
            label="All"
          />
          <Typography variant="subtitle1" sx={{ fontSize: "25px" }}>
            Filters
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.isvegan}
                onChange={(e) =>
                  setFilters({ ...filters, isvegan: e.target.checked })
                }
              />
            }
            label="Vegan"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.isglutenfree}
                onChange={(e) =>
                  setFilters({ ...filters, isglutenfree: e.target.checked })
                }
              />
            }
            label="Gluten Free"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.isdietary}
                onChange={(e) =>
                  setFilters({ ...filters, isdietary: e.target.checked })
                }
              />
            }
            label="Dietary"
          />
          <Button
            variant="outlined"
            onClick={resetFilters}
            style={{
              marginTop: 20,
              borderColor: "rgba(128, 96, 68, 1)",
              color: "rgba(128, 96, 68, 1)",
            }}
          >
            Reset Filters
          </Button>
        </div>
      </Drawer>

      <Grid
        container
        spacing={3}
        sx={{ marginLeft: { md: "10px" }, color: "rgba(128, 96, 68, 1)" }}
      >
        {dishes.map((dish) => (
          <Grid item xs={12} sm={6} md={4} key={dish.id}>
            <Card>
              <CardContent>
                <img
                  src={getDishPhotoUrl(dish.photo)}
                  alt={dish.name}
                  style={{ width: "100%" }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "rgba(128, 96, 68, 1)", fontSize: "25px" }}
                >
                  {dish.name}
                </Typography>
                <Typography variant="body2">
                  Quantity:
                  <Button
                    onClick={() => handleQuantityChange(dish.id, -1)}
                    sx={{ color: "rgba(128, 96, 68, 1)" }}
                  >
                    -
                  </Button>
                  {cartQuantities[dish.id] || 1}
                  <Button
                    onClick={() => handleQuantityChange(dish.id, 1)}
                    sx={{ color: "rgba(128, 96, 68, 1)" }}
                  >
                    +
                  </Button>
                </Typography>
                <Typography variant="body2">
                  Price: $
                  {(dish.price * (cartQuantities[dish.id] || 1)).toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleAddToCart(dish)}
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "rgba(128, 96, 68, 1)",
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={modalOpen} onClose={handleModalClose}>
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            color: "rgba(128, 96, 68, 1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2>Please log in or register</h2>
          <Button
            component={Link}
            to="/login"
            sx={{ color: "rgba(128, 96, 68, 1)" }}
          >
            Go to Login
          </Button>
        </div>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Стрелка в правом нижнем углу */}
      <Button
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "rgba(128, 96, 68, 1)",
          color: "white",
          borderRadius: "50%",
          padding: "10px",
          fontSize: "1.5rem",
        }}
      >
        <KeyboardArrowUp sx={{ fontSize: "2rem" }} />
      </Button>
    </div>
  );
};

export default DishComponent;
