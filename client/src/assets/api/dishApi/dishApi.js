import axiosInstance from "../apiConfig";

export const getDishes = async (filters) => {
  const response = await axiosInstance.get(`/dishes`, { params: filters });
  return response.data;
};

// Функция для получения полного URL фотографии
export const getDishPhotoUrl = (dishPhoto) => {
  return `http://localhost:5000/api/static/${dishPhoto}`;
};
