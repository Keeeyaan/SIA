import { axiosPrivate } from "@/components/AxiosInterceptor";

interface IGetAllAdminsResponse {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
}

export const getAllAdmins = async () => {
  const response = await axiosPrivate.get<IGetAllAdminsResponse[]>(`admins/`);
  return response.data;
};
