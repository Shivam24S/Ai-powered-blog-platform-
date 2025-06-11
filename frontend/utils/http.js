import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

const SERVER_BASE_URL = import.meta.env.VITE_BACKEND_SERVER_API_URL;

export const httpRequest = async ({
  url,
  method = "GET",
  body = null,
  headers = {},
}) => {
  try {
    const response = await axios({
      url: `${SERVER_BASE_URL}${url}`,
      method,
      data: body,
      headers,
    });

    if (!response.data) {
      throw new Error("HTTP request failed");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error.message);
    }
    throw error;
  }
};
