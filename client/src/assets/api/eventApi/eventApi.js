import axiosInstance from "../apiConfig";

export const addEvent = async (eventData) => {
  try {
    const response = await axiosInstance.post(`/events`, eventData);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding event:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
