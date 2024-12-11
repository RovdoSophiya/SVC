import axiosInstance from "../apiConfig";

export const getReviews = async (page = 1, limit = 3) => {
  const response = await axiosInstance.get(
    `/reviews?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const fetchOrdersWithoutReviews = async (clientId) => {
  try {
    const response = await axiosInstance.get(
      `/orders/getWithoutReviews/${clientId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching orders without reviews:", error.message);
    throw new Error("Ошибка загрузки заказов. Попробуйте позже.");
  }
};

export const addReview = async (reviewData) => {
  try {
    await axiosInstance.post("/reviews", reviewData);
    return "Your review has been successfully added!";
  } catch (error) {
    console.error("Error adding review:", error.message);
    throw new Error("Error adding review. Please try again later.");
  }
};
