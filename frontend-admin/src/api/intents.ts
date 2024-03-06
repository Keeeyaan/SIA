import { axiosPrivate } from "@/components/AxiosInterceptor";

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
  const response = await axiosPrivate.get<IGetIntentsResponse[]>(`intents/`);
  return response.data;
};

export const getPatternsAndResponsesByTag = async (tag: string) => {
  const response =
    await axiosPrivate.get<IGetPatternsAndResponsesByTagResponse>(
      `intents/${tag}/`
    );
  return response.data;
};

export const createIntent = async (data: { tag: string }) => {
  const response = await axiosPrivate.post<IGenericResponse>(`intents`, data);
  return response.data;
};

export const addIntentPattern = async ({
  tag,
  data,
}: {
  tag: string;
  data: { pattern: string };
}) => {
  const response = await axiosPrivate.post<IGenericResponse>(
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
  const response = await axiosPrivate.post<IGenericResponse>(
    `intents/response/${tag}`,
    data
  );
  return response.data;
};
