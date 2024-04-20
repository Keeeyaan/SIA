import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getIntents = async (token: string) => {
    const response = await axios.get(`intents/public/`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}