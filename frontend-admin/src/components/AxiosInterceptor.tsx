import axios from "axios";
import { ReactNode, useEffect } from "react";

/* eslint-disable-next-line react-refresh/only-export-components*/
export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] =
            `Bearer ${localStorage.getItem("ucnian-token")}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;
        const errorMessage = error.response?.data.detail;

        if (errorMessage?.includes("Invalid") && !prevRequest?.sent) {
          prevRequest.sent = true;
          localStorage.removeItem("ucnian-token");
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.request.eject(responseIntercept);
    };
  }, []);

  return children;
};

export default AxiosInterceptor;
