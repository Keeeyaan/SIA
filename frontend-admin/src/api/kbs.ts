import { axiosPrivate } from "@/components/AxiosInterceptor";
import { IGenericResponse } from "./intents";

export interface IGetKnowledgeBaseResponse {
  _id: string;
  intents: [];
  version: string;
  created_at: Date;
}

export const getAllKnowledgeBase = async () => {
  const response = await axiosPrivate.get<IGetKnowledgeBaseResponse[]>(`kbs/`);
  return response.data;
};

export const createKnowledgeBase = async (data: { version: string }) => {
  const response = await axiosPrivate.post<IGetKnowledgeBaseResponse>(
    `kbs/`,
    data
  );
  return response.data;
};

export const deleteKnowledgeBase = async (id: string) => {
  const response = await axiosPrivate.delete<IGenericResponse>(`kbs/${id}`);
  return response.data;
};
