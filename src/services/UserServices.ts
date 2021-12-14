import axios from "axios";
import { GetUserResponse, GetUsersResponse, UserLoginData, UserLoginResponse, UserRegisterData, UserRegisterResponse } from "../interfaces/UserInterfaces";
import { API_URL } from "../utils/constants";
import { axiosConfig } from "../utils/utils";

export const login = async (data: UserLoginData): Promise<UserLoginResponse> => {
  const res = await axios.post<UserLoginResponse>(API_URL + "/login", data, axiosConfig());
  if (typeof res.data.data !== "string") {
    localStorage.setItem("token", res.data.data.token);
  }
    
  return res.data;
};

export const register = async (data: UserRegisterData): Promise<UserRegisterResponse> => {
  const res = await axios.post<UserRegisterResponse>(API_URL + "/register", data, axiosConfig());
  if (typeof res.data.data !== "string") {
    localStorage.setItem("token", res.data.data.token);
  }

  return res.data;
};

export const logout = async (): Promise<void> => {
  await axios.post<UserLoginResponse>(API_URL + "/logout", {}, axiosConfig());
};

export const getUser = async (id: string): Promise<GetUserResponse> => {
  const res = await axios.get<GetUserResponse>(API_URL + `/users/${id}`, axiosConfig());

  return res.data;
};

export const getUsers = async (): Promise<GetUsersResponse> => {
  const res = await axios.get<GetUsersResponse>(API_URL + "/users", axiosConfig());

  return res.data;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const res = await axios.delete(API_URL + `/users/${id}`, axiosConfig());

  return res.status === 204;
};

export const postSeller = async (data: UserRegisterData): Promise<UserRegisterResponse> => {
  const res = await axios.post<UserRegisterResponse>(API_URL + "/sellers", data, axiosConfig());

  return res.data;
};