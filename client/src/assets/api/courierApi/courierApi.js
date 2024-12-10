import axiosInstance from "../apiConfig";

export const fetchCourierById = async (id) => {
  try {
    const response = await axiosInstance.get(`/couriers/${id}`);
    return {
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};
export const handleError = (error) => {
  const message =
    error.response?.data?.error || "An unexpected error occurred.";
  return { data: null, message };
};
export const updateCourier = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/couriers/${id}`, data);
    return {
      data: response.data,
      message: "Courier data updated successfully.",
    };
  } catch (error) {
    return handleError(error);
  }
};

export const checkPhoneExists = async (phone, courierId) => {
  try {
    const response = await axiosInstance.get(
      `/couriers/check/checkPhoneExists=${phone}`,
      {
        params: { phone, courierid: courierId },
      }
    );
    return { data: response.data.exists, message: "Phone check completed." };
  } catch (error) {
    return handleError(error);
  }
};
