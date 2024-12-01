import axiosInstance from "../apiConfig";

export const fetchCartCount = async (userId) => {
  try {
    const response = await axiosInstance.get(`/carts/total/${userId}`);
    return response.data.total; // Возвращаем общее количество товаров
  } catch (error) {
    console.error("Error fetching cart count:", error);
    throw error;
  }
};
