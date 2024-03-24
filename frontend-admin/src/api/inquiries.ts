import { axiosPrivate } from "@/components/AxiosInterceptor";

interface IGetAllInquiriesResponse {
  _id: string;
  token: string;
  inquiry: string;
  tag: string;
  created_at: Date;
}

export const getAllInquiries = async () => {
  const response =
    await axiosPrivate.get<IGetAllInquiriesResponse[]>(`inquiries/`);
  return response.data;
};
