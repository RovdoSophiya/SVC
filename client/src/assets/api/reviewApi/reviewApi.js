import axiosInstance from "../apiConfig";

export const getReviews = async (page = 1, limit = 3) => {
  const response = await axiosInstance.get(
    `/reviews?page=${page}&limit=${limit}`
  );
  return response.data;
};
