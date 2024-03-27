import { axiosPrivate } from "@/components/AxiosInterceptor";
import { IGenericResponse } from "./intents";

export interface IGetAllInquiriesResponse {
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

export const updateInquiry = async ({
  id,
  data,
}: {
  id: string;
  data: { tag: string; inquiry: string };
}) => {
  const response = await axiosPrivate.patch<IGenericResponse>(
    `inquiries/${id}`,
    data
  );
  return response.data;
};

export const deleteInquiry = async (id: string) => {
  const response = await axiosPrivate.delete<IGenericResponse>(
    `inquiries/${id}`
  );
  return response.data;
};
