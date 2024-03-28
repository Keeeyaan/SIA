import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

export interface Sequence {
  inquiry: string
  response: string
  createdAt: string
}

interface Conversation {
  token: string
  sequence: Sequence[]
  createdAt: string
}

interface PostConversation {
  inquiry: string
  kbs_version: string
}

interface UpdateConversation {
  token: string
  inquiry: string
  kbs_version: string
}

export const getConversation = async (token: string) => {
  const response = await axios.get<Conversation>(`conversation/${token}`)
  return response
}

export const createConversation = async (data: PostConversation) => {
  const response = await axios.post<PostConversation>(`conversation/`, data)
  return response
}

export const updateConversation = async (data: UpdateConversation) => {
  const response = await axios.patch<UpdateConversation>(`conversation/`, data)
  return response
}