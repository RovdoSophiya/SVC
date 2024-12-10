import axiosInstance from "../apiConfig";

export const fetchOrders = async (clientid, page, limit) => {
  try {
    const response = await axiosInstance.get("/orders/current", {
      params: {
        clientid,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const fetchAllOrders = async (
  clientid,
  currentPage,
  limit,
  sortOrder
) => {
  try {
    const response = await axiosInstance.get("/orders", {
      params: {
        clientid: clientid,
        page: currentPage,
        limit: limit,
        sortBy: "orderdate",
        order: sortOrder,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw new Error("Error fetching orders");
  }
};

export const downloadOrdersExcel = async (clientid) => {
  try {
    const response = await axiosInstance.get("/orders/excel", {
      params: { clientid: clientid },
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error downloading Excel file:", error.message);
    throw new Error("Error downloading Excel file");
  }
};
