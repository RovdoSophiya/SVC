import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { getDishPhotoUrl } from "../../../api/dishApi/dishApi";
import {
  fetchOrdersWithoutReviews,
  addReview,
} from "../../../api/reviewApi/reviewApi";

const AddReview = () => {
  const clientId = localStorage.getItem("id");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await fetchOrdersWithoutReviews(clientId);
        setOrders(ordersData);
      } catch (error) {
        setSnackbarMessage(error.message);
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [clientId]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setRating(0);
    setComment("");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
    setRating(0);
    setComment("");
  };

  const handleConfirmation = async () => {
    try {
      const reviewData = {
        clientid: clientId,
        orderid: selectedOrder.orderId,
        rating,
        comment,
      };

      const successMessage = await addReview(reviewData);

      setSnackbarMessage(successMessage);
      setSnackbarOpen(true);
      setModalOpen(false);

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== selectedOrder.orderId)
      );
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    } finally {
      setConfirmationOpen(false);
    }
  };

  const handleSubmit = () => {
    if (rating < 1) {
      setSnackbarMessage("The rating must be at least 1 star.");
      setSnackbarOpen(true);
      return;
    }
    if (comment.length > 255) {
      setSnackbarMessage("Reviews must not exceed 255 characters.");
      setSnackbarOpen(true);
      return;
    }
    setConfirmationOpen(true);
  };

  return (
    <Box>
      {loading ? (
        <Typography
          variant="h6"
          align="center"
          sx={{ margin: "50px auto", color: "rgba(128, 96, 68, 1)" }}
        >
          Loading orders...
        </Typography>
      ) : orders.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          sx={{ margin: "50px auto", color: "rgba(128, 96, 68, 1)" }}
        >
          You currently have no completed orders.
        </Typography>
      ) : (
        orders.map((order) => (
          <Card
            key={order.orderId}
            sx={{
              marginBottom: 2,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              color: "rgba(128, 96, 68, 1)",
            }}
          >
            <CardContent>
              <Typography variant="h6">
                Delivery date: {order.deliveryDate}
              </Typography>
              <Typography variant="body1">
                Sum: {order.totalAmount} $
              </Typography>
              <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                List of dishes:
              </Typography>
              {order.orderedDishes.map((dish, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 1,
                    justifyContent: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      getDishPhotoUrl(dish.dishPhoto) || "/placeholder.png"
                    }
                    alt={dish.dishName}
                    sx={{
                      width: 100,
                      height: 100,
                      marginRight: 2,
                      borderRadius: "5px",
                      borderWidth: "3px",
                      borderStyle: "solid",
                      borderColor: "rgba(128, 96, 68, 1)",
                    }}
                  />
                  <Box>
                    <Typography>{dish.dishName}</Typography>
                    <Typography>
                      Count: {dish.quantity}, Price: {dish.dishPrice} $
                    </Typography>
                    <Typography>Total: {dish.totalPrice} $</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenModal(order)}
              sx={{
                width: "300px",
                margin: " 20px auto",
                backgroundColor: "transparent",
                color: "rgba(128, 96, 68, 1)",
                borderWidth: "3px",
                borderStyle: "solid",
                borderColor: "rgba(128, 96, 68, 1)",
              }}
            >
              Add review
            </Button>
          </Card>
        ))
      )}
      <a
        href="/client"
        style={{
          display: "block",
          textAlign: "center",
          marginTop: "70px",
          marginBottom: "70px",
          textDecoration: "none",
          fontSize: "24px",
          color: "rgba(128, 96, 68, 1)",
        }}
      >
        Return back
      </a>

      {/* Модальное окно для отзыва */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle sx={{ color: "rgba(128, 96, 68, 1)" }}>
          Adding a review
        </DialogTitle>
        <DialogContent>
          <Typography component="legend" sx={{ color: "rgba(128, 96, 68, 1)" }}>
            Rating
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            margin="normal"
            label="Review"
            placeholder="Write review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            onClick={handleCloseModal}
            sx={{
              color: "rgba(128, 96, 68, 1)",
              borderWidth: "3px",
              borderStyle: "solid",
              borderColor: "rgba(128, 96, 68, 1)",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{
              color: "white",
              backgroundColor: "rgba(128, 96, 68, 1)",
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог подтверждения */}
      <Dialog open={confirmationOpen}>
        <DialogTitle sx={{ color: "rgba(128, 96, 68, 1)" }}>
          Confirmation
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "rgba(128, 96, 68, 1)" }}>
            Are you sure you want to submit review?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmationOpen(false)}
            sx={{
              color: "rgba(128, 96, 68, 1)",
              borderWidth: "3px",
              borderStyle: "solid",
              borderColor: "rgba(128, 96, 68, 1)",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmation}
            sx={{
              color: "white",
              backgroundColor: "rgba(128, 96, 68, 1)",
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar для уведомлений */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarMessage.includes("success") ? "success" : "error"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddReview;
