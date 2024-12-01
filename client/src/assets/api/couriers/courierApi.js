import axiosInstance from "../apiConfig";

export const fetchCourierById = async (courierId) => {
  const response = await axiosInstance.get(`/couriers/${courierId}`);
  return response.data;
};
