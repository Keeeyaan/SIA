import axios from "axios";
import { Sequence } from "./conversation";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

interface Feedback {
  sequence: Sequence
  comment: string
  sentiment: string
  version: string
}

export const createFeedback = async (data: Feedback) => {
  const response = await axios.post<Feedback>(`feedbacks/`, data)
  return response
}