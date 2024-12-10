import axiosInstance from "../apiConfig";

export const fetchOrderHistory = async (
  courierId,
  currentPage,
  ordersPerPage
) => {
  try {
    const response = await axiosInstance.get(
      `/deliveries/courier/history/${courierId}`,
      {
        params: {
          page: currentPage,
          limit: ordersPerPage,
        },
      }
    );
    return { data: response.data };
  } catch (error) {
    return { error: "Error loading order history" };
  }
};

export const downloadCourierHistory = async (courierId) => {
  try {
    const response = await axiosInstance.get(
      `/deliveries/courier/history/download/${courierId}`,
      {
        responseType: "blob",
      }
    );
    return { data: response.data };
  } catch (error) {
    return { error: "Error downloading file." };
  }
};

export const fetchCurrentDeliveries = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `deliveries/search/courierid:${userId}`
    );
    return { data: response.data };
  } catch (error) {
    return { error: "Error loading current deliveries" };
  }
};

export const fetchSortedDeliveries = async (userId, sortBy, order) => {
  try {
    const response = await axiosInstance.get(
      `deliveries/sort/sortBy${sortBy}/${userId}`,
      { params: { order } }
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: `Error loading sorted deliveries by ${sortBy.toLowerCase()}`,
    };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    await axiosInstance.patch(`deliveries/${orderId}/status`, { status });
    return { success: true };
  } catch (error) {
    return { error: "Error updating order status." };
  }
};

export const fetchAvailableOrders = async () => {
  try {
    const response = await axiosInstance.get("deliveries/search/available");
    return { data: response.data };
  } catch (error) {
    return { error: "Error loading orders" };
  }
};

export const fetchSortedOrders = async (sortBy, order) => {
  try {
    const response = await axiosInstance.get(
      `deliveries/sort/sortBy${sortBy}/available`,
      {
        params: { order },
      }
    );
    return { data: response.data };
  } catch (error) {
    return { error: `Error loading sorted orders by ${sortBy.toLowerCase()}` };
  }
};

export const takeOrder = async (userId, orderId) => {
  try {
    await axiosInstance.put(`couriers/${userId}/takeOrder/${orderId}`);
    return { success: true };
  } catch (error) {
    return { error: "Oops, something went wrong!" };
  }
};
