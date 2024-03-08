import { axiosPrivate } from "@/components/AxiosInterceptor";

interface IGetAllInquiriesResponse {
  _id: string;
  tag: string;
  patterns: [string];
  responses: [string];
  frequency: number;
  created_at: Date;
}

export const getAllInquiries = async () => {
  const response =
    await axiosPrivate.get<IGetAllInquiriesResponse[]>(`inquiries/`);
  return response.data;
};
