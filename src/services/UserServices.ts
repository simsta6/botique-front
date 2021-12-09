import { User } from "./../utils/interfaces";
import axios from "axios";
import { API_URL } from "../utils/constants";

interface UserLoginData {
  email: string;
  password: string;
}

export interface UserLoginResponse {
    status: "Success" | "Failed";
    data: User & {      
        __v: number;
        token: string;
    } | string
}

const config = {
  credentials: "include",
  headers: {
    "content-type": "application/json"
  },
  validateStatus: (status: number) => {
    return status >= 200 && status < 500;
  },
};

export const login = async (data: UserLoginData): Promise<UserLoginResponse> => {
  const res = await axios.post<UserLoginResponse>(API_URL + "/login", data, config);

  return res.data;
};

export const logout = async (): Promise<UserLoginResponse> => {
  const res = await axios.post<UserLoginResponse>(API_URL + "/logout", {}, config);

  return res.data;
};