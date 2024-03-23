import { axiosPrivate } from "@/components/AxiosInterceptor";

interface IGetAllInquiriesResponse {
  _id: string;
  sequence: [];
  comment: string;
  sentiment: string;
  version: string;
  created_at: Date;
}

export const getAllFeedbacks = async () => {
  const response =
    await axiosPrivate.get<IGetAllInquiriesResponse[]>(`feedbacks/`);
  return response.data;
};
