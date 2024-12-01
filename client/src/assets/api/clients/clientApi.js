import axiosInstance from "../apiConfig";

export const fetchClientById = async (clientId) => {
  const response = await axiosInstance.get(`/clients/${clientId}`);
  return response.data;
};
