import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

interface ILoginProp {
  email: string;
  password: string;
}

interface ILoginResponse {
  access_token: string;
  message: string;
  token_type: string;
}

export async function login(data: ILoginProp) {
  const response = await axios.post<ILoginResponse>(`auth/login`, data);
  return response.data;
}
