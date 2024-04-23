import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

interface IVersions {
  available_versions: string[];
}

export const getVersions = async () => {
  const response = await axios.get<IVersions>("model/");

  return response.data;
};
