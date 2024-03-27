import { axiosPrivate } from "@/components/AxiosInterceptor";
import { IGenericResponse } from "./intents";

export interface IGetAllAdminsResponse {
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

export const updateAdminById = async ({
  id,
  data,
}: {
  id: string;
  data: { first_name: string; last_name: string };
}) => {
  const response = await axiosPrivate.patch<IGenericResponse>(
    `admins/${id}`,
    data
  );
  return response.data;
};

export const deleteAdminById = async (id: string) => {
  const response = await axiosPrivate.delete<IGenericResponse>(`admins/${id}`);
  return response.data;
};
