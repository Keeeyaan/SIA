import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

export interface ISequence {
  inquiry: string;
  response: string;
  createdAt: string;
}

export interface IConversation {
  token: string;
  sequence: ISequence[];
  createdAt: string;
}

export const getConversation = async (token: string) => {
  if (token === "") {
    return {
      token: token,
      sequence: [],
      createdAt: "",
    };
  }

  const response = await axios.get<IConversation>(`conversation/${token}`);
  return response.data;
};

export const createConversation = async (data: { inquiry: string }) => {
  const response = await axios.post<IConversation>(`conversation/`, data);
  return response.data;
};

export const updateConversation = async (data: {
  inquiry: string;
  token: string;
}) => {
  const response = await axios.patch<IConversation>(`conversation/`, data);
  return response;
};
