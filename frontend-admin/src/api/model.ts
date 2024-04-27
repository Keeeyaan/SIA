import { axiosPrivate } from "@/components/AxiosInterceptor";
import { IGenericResponse } from "./intents";

export const createModel = async (data: { kbs_version: string }) => {
  const response = await axiosPrivate.post<IGenericResponse>(`model/`, data);
  return response.data;
};
