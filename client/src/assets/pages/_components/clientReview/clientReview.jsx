import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Snackbar } from "@mui/material";
import { getDishPhotoUrl } from "../../../api/dishApi/dishApi";

const CompletedOrders = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const clientid = localStorage.getItem("id"); // Получаем clientid из localStorage

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/deliveries/get/completed`,
          {
            params: { clientid },
          }
        );
        setDeliveries(response.data.deliveries);
      } catch (error) {
        console.error("Error fetching delivered orders:", error);
      }
    };

    fetchDeliveredOrders();
  }, [clientid]);

  const handleAddReview = async (orderid) => {
    if (rating < 1 || rating > 5) {
      setSnackbarMessage("Рейтинг должен быть от 1 до 5");
      setSnackbarOpen(true);
      return;
    }

    if (comment.length > 255) {
      setSnackbarMessage("Текст отзыва не может превышать 255 символов");
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/reviews`, {
        clientid,
        orderid,
        rating,
        comment,
      });
      setSnackbarMessage("Отзыв добавлен успешно");
      setSnackbarOpen(true);
      setComment(""); // Сбрасываем текст отзыва
      setRating(1); // Сбрасываем рейтинг
    } catch (error) {
      console.error("Error adding review:", error);
      setSnackbarMessage("Ошибка при добавлении отзыва");
      setSnackbarOpen(true);
    }
  };

  return (
    <div>
      <Typography variant="h4">Завершенные заказы</Typography>
      {deliveries.length === 0 ? (
        <Typography variant="body1">Нет завершенных доставок.</Typography> // Сообщение при отсутствии доставок
      ) : (
        deliveries.map((delivery, index) => (
          <div key={delivery.deliveryid}>
            <Typography variant="h6">Доставка #{index + 1}</Typography>
            <Typography variant="body1">
              Сумма заказа: {delivery.totalamount} руб.
            </Typography>
            <ul>
              {delivery.dishes.map((dish, dishIndex) => (
                <li key={dishIndex}>
                  <img
                    src={getDishPhotoUrl(dish.photo)}
                    alt={dish.name}
                    width={50}
                  />
                  {dish.name}
                </li>
              ))}
            </ul>
            <TextField
              label="Рейтинг (1-5)"
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              inputProps={{ min: 1, max: 5 }}
            />
            <TextField
              label="Комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              inputProps={{ maxLength: 255 }}
              multiline
              rows={4}
            />
            <Button onClick={() => handleAddReview(delivery.deliveryid)}>
              Добавить отзыв
            </Button>
          </div>
        ))
      )}
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        autoHideDuration={3000}
      />
    </div>
  );
};

export default CompletedOrders;
