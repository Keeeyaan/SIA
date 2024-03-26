import { axiosPrivate } from "@/components/AxiosInterceptor";

export interface IGenericResponse {
  detail: string;
}

export interface IGetIntentsResponse {
  _id: string;
  tag: string;
  patterns: [string];
  responses: [string];
  frequency: number;
}

export interface IGetPatternsAndResponsesByTagResponse {
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
export const deleteIntentByTag = async (tag: string) => {
  const response = await axiosPrivate.delete<IGenericResponse>(
    `intents/${tag}`
  );
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

export const updateIntentPattern = async ({
  tag,
  id,
  data,
}: {
  tag: string;
  id: number;
  data: { pattern: string };
}) => {
  const response = await axiosPrivate.patch<IGenericResponse>(
    `intents/pattern/${tag}/id/${id}/`,
    data
  );
  return response.data;
};

export const deleteIntentPattern = async ({
  tag,
  id,
}: {
  tag: string;
  id: number;
}) => {
  const response = await axiosPrivate.delete<IGenericResponse>(
    `intents/pattern/${tag}/id/${id}/`
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
export const updateIntentResponse = async ({
  tag,
  id,
  data,
}: {
  tag: string;
  id: number;
  data: { response: string };
}) => {
  const response = await axiosPrivate.patch<IGenericResponse>(
    `intents/response/${tag}/id/${id}`,
    data
  );
  return response.data;
};

export const deleteIntentResponse = async ({
  tag,
  id,
}: {
  tag: string;
  id: number;
}) => {
  const response = await axiosPrivate.delete<IGenericResponse>(
    `intents/response/${tag}/id/${id}`
  );
  return response.data;
};
