import axiosInstance from "../apiConfig";

// Функция для входа
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/authorization/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post("authorization/register", {
      name: formData.name,
      lastname: formData.lastname,
      fathername: formData.fathername,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      password: formData.password,
    });
    return { data: response.data };
  } catch (error) {
    if (error.response) {
      const message = error.response.data?.message;
      return { error: message || "Registration failed" };
    } else {
      return { error: "Mistake. Please, try again." };
    }
  }
};
