import axiosInstance from "../apiConfig";

export const addToCart = async (clientid, dishid, count) => {
  try {
    const response = await axiosInstance.post(`/carts/add`, {
      clientid: clientid,
      dishid: dishid,
      count,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const increaseCartCount = async (clientid, dishid) => {
  try {
    const response = await axiosInstance.put(
      `/carts/${clientid}/${dishid}/increase`
    );
    return response.data;
  } catch (error) {
    console.error("Error when increasing count:", error);
    throw error;
  }
};

export const decreaseCartCount = async (clientid, dishid) => {
  try {
    const response = await axiosInstance.put(
      `/carts/${clientid}/${dishid}/decrease`
    );
    return response.data;
  } catch (error) {
    console.error("Error when decreasing count:", error);
    throw error;
  }
};

export const fetchCartItems = async (clientid) => {
  try {
    const response = await axiosInstance.get(`/carts/${clientid}`);
    return response.data;
  } catch (error) {
    console.error("Error when fetching cart items:", error);
    throw error;
  }
};

export const deleteFromCart = async (clientid, dishid) => {
  try {
    const response = await axiosInstance.delete(`/carts/${clientid}/${dishid}`);
    return response.data;
  } catch (error) {
    console.error("Error when fetching cart items:", error);
    throw error;
  }
};

export const orderCart = async (clientid) => {
  try {
    const response = await axiosInstance.post(`/carts/order/${clientid}`);
    return response.data;
  } catch (error) {
    console.error("Error when placing an order:", error);
    throw error;
  }
};

export const fetchCartCount = async (clientid) => {
  try {
    const response = await axiosInstance.get(`/carts/total/${clientid}`);
    return response.data.total;
  } catch (error) {
    console.error("Error when fetching cart count:", error);
    throw error;
  }
};
