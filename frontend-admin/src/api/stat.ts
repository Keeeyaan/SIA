import { axiosPrivate } from "@/components/AxiosInterceptor";

export interface IGetStatResponse {
  models: number;
  inquiries: number;
  intents: number;
  feedbacks: number;
}

export const getStats = async () => {
  const response = await axiosPrivate.get<IGetStatResponse>(`stats/`);
  return response.data;
};
