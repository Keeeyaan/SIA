import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

interface IGenericResponse {
  detail: string;
}

export const createInquiry = async (data: { inquiry: string }) => {
  const response = await axios.post<IGenericResponse>(`inquiries`, data);
  return response.data;
};
