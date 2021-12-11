import { AxiosRequestConfig } from "axios";

export const axiosConfig = (): AxiosRequestConfig => ({
  withCredentials: true,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
  validateStatus: (status: number): boolean => {
    return status >= 200 && status < 500;
  },
});
