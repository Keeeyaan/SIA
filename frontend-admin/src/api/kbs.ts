import { axiosPrivate } from "@/components/AxiosInterceptor";

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
