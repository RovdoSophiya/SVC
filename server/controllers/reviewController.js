const Review = require("../models/Review");
const Client = require("../models/Client");
const Order = require("../models/Order");

const handleError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: error.message });
};

// Добавление отзыва
const addReview = async (req, res) => {
  try {
    const { clientid, orderid, rating, comment } = req.body;

    // Проверка на существование клиента
    const client = await Client.findByPk(clientid);
    if (!client) {
      return res.status(400).json({ message: "Client not found" });
    }

    // Проверка на существование заказа
    const order = await Order.findByPk(orderid);
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    // Проверка рейтинга
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    // Проверка текста отзыва
    if (comment.length > 700) {
      return res
        .status(400)
        .json({ message: "Review text cannot exceed 700 characters" });
    }

    // Создание отзыва
    const review = await Review.create({
      clientid,
      orderid,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    handleError(res, error);
  }
};

// Редактирование отзыва
const editReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    const { rating, comment } = req.body;

    if (rating < 1 || rating > 5)
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    if (comment.length > 700)
      return res
        .status(400)
        .json({ message: "Review text cannot exceed 700 characters" });

    await review.update(req.body);
    res.json(review);
  } catch (error) {
    handleError(res, error);
  }
};

// Удаление отзыва
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    await review.destroy();
    res.json({ message: "Review deleted" });
  } catch (error) {
    handleError(res, error);
  }
};

const getReviews = async (req, res) => {
  const { page = 1, limit = 3 } = req.query;

  try {
    const reviews = await Review.findAndCountAll({
      include: {
        model: Client,
        attributes: ["name", "lastname"],
      },
      order: [["addtime", "DESC"]],
      limit: parseInt(limit, 10),
      offset: (page - 1) * limit,
    });

    res.json({
      total: reviews.count,
      totalPages: Math.ceil(reviews.count / limit),
      currentPage: page,
      reviews: reviews.rows,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error); // Логирование ошибки
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addReview,
  editReview,
  deleteReview,
  getReviews,
};
