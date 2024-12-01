import axiosInstance from "../apiConfig";

export const fetchCartCount = async (userId) => {
  try {
    const response = await axiosInstance.get(`/carts/total/${userId}`);
    return response.data.price;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    throw error;
  }
};

export const addToCart = async (clientId, dishId, count) => {
  try {
    const response = await axiosInstance.post(`/carts/add`, {
      clientid: clientId,
      dishid: dishId,
      count,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
