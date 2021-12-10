import axios from "axios";
import { UserLoginData, UserLoginResponse, UserRegisterData, UserRegisterResponse } from "../interfaces/UserInterfaces";
import { API_URL } from "../utils/constants";
import { axiosConfig } from "../utils/utils";

export const login = async (data: UserLoginData): Promise<UserLoginResponse> => {
  const res = await axios.post<UserLoginResponse>(API_URL + "/login", data, axiosConfig);

  return res.data;
};

export const register = async (data: UserRegisterData): Promise<UserRegisterResponse> => {
  const res = await axios.post<UserRegisterResponse>(API_URL + "/register", data, axiosConfig);

  return res.data;
};

export const logout = async (): Promise<void> => {
  await axios.post<UserLoginResponse>(API_URL + "/logout", {}, axiosConfig);
};