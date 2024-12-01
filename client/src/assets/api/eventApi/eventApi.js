import axiosInstance from "../apiConfig";

export const addEvent = async (eventData) => {
  const response = await axiosInstance.post(`/events`, eventData);
  return response.data;
};
