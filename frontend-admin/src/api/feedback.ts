import { axiosPrivate } from "@/components/AxiosInterceptor";
import { IGenericResponse } from "./intents";

export interface IGetAllFeedbackResponse {
  _id: string;
  sequence: [];
  comment: string;
  sentiment: string;
  version?: string;
  created_at: Date;
}

export const getAllFeedbacks = async () => {
  const response =
    await axiosPrivate.get<IGetAllFeedbackResponse[]>(`feedbacks/`);
  return response.data;
};

export const createFeedback = async () => {
  const response =
    await axiosPrivate.post<IGetAllFeedbackResponse>(`feedbacks/`);
  return response.data;
};

export const deleteFeedbackById = async (id: string) => {
  const response = await axiosPrivate.delete<IGenericResponse>(
    `feedbacks/${id}`
  );
  return response.data;
};
