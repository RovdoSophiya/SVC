const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/reviewController");

// Добавление отзыва
router.post("/", ReviewController.addReview);

// Редактирование отзыва
router.put("/:id", ReviewController.editReview);

// Удаление отзыва
router.delete("/:id", ReviewController.deleteReview);

router.get("/", ReviewController.getReviews);

module.exports = router;
