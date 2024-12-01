import axiosInstance from "../apiConfig";

// Функция для входа
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/authorization/login", {
      email,
      password,
    });
    console.log("Response from login API:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
