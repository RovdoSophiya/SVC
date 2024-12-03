import axiosInstance from "../apiConfig";

export const fetchClientById = async (clientId) => {
  try {
    const response = await axiosInstance.get(`/clients/${clientId}`);
    return {
      data: response.data,
    };
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error) => {
  const message =
    error.response?.data?.error || "An unexpected error occurred.";
  return { data: null, message };
};

class ClientApi {
  async fetchClient(clientId) {
    try {
      const response = await axiosInstance.get(`/clients/${clientId}`);
      return {
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateClient(clientId, clientData) {
    try {
      const response = await axiosInstance.put(
        `/clients/${clientId}`,
        clientData
      );
      return {
        data: response.data,
        message: "Client data updated successfully.",
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async checkPhoneExists(phone, clientid) {
    try {
      const response = await axiosInstance.get(
        `/clients/check/check-phone?phone=${phone}`,
        {
          params: { phone, clientid },
        }
      );
      return { data: response.data.exists, message: "Phone check completed." };
    } catch (error) {
      return this.handleError(error);
    }
  }

  handleError(error) {
    const message =
      error.response?.data?.error || "An unexpected error occurred.";
    return { data: null, message };
  }
}

export default new ClientApi();
