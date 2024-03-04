import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

interface IGenericResponse {
  detail: string;
}

interface IGetIntentsResponse {
  _id: string;
  tag: string;
  patterns: [string];
  responses: [string];
  frequency: number;
}

interface IGetPatternsAndResponsesByTagResponse {
  patterns: [string];
  responses: [string];
}

export const getIntents = async () => {
  const response = await axios.get<IGetIntentsResponse[]>(`intents/`);
  return response.data;
};

export const getPatternsAndResponsesByTag = async (tag: string) => {
  const response = await axios.get<IGetPatternsAndResponsesByTagResponse>(
    `intents/${tag}/`
  );
  return response.data;
};

export const createIntent = async (data: { tag: string }) => {
  const response = await axios.post<IGenericResponse>(`intents`, data);
  return response.data;
};

export const addIntentPattern = async ({
  tag,
  data,
}: {
  tag: string;
  data: { pattern: string };
}) => {
  const response = await axios.post<IGenericResponse>(
    `intents/pattern/${tag}`,
    data
  );
  return response.data;
};

export const addIntentResponse = async ({
  tag,
  data,
}: {
  tag: string;
  data: { response: string };
}) => {
  const response = await axios.post<IGenericResponse>(
    `intents/response/${tag}`,
    data
  );
  return response.data;
};
