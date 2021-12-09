import axios from "axios";
import { API_URL } from "../utils/constants";
import { User } from "./../utils/interfaces";

const config = {
  credentials: "include",
  headers: {
    "content-type": "application/json"
  },
  validateStatus: (status: number) => {
    return status >= 200 && status < 500;
  },
};

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

export const login = async (data: UserLoginData): Promise<UserLoginResponse> => {
  const res = await axios.post<UserLoginResponse>(API_URL + "/login", data, config);

  return res.data;
};

interface UserRegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export type UserRegisterResponse = UserLoginResponse

export const register = async (data: UserRegisterData): Promise<UserRegisterResponse> => {
  const res = await axios.post<UserRegisterResponse>(API_URL + "/register", data, config);

  return res.data;
};

export const logout = async (): Promise<void> => {
  await axios.post<UserLoginResponse>(API_URL + "/logout", {}, config);
};