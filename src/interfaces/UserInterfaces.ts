export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "seller" | "buyer" | "admin";
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserLoginResponse {
  status: "Success" | "Failed";
  data: User & {
    __v: number;
    token: string;
  } | string;
}

export type UserRegisterResponse = UserLoginResponse;

export interface BasicUserData {
  first_name: string;
  last_name: string;
}

export interface GetUserResponse {
  status: "Success" | "Failed";
  data: BasicUserData & {
    _id: string;
  } | string;
}

export interface AdminGottenUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "buyer" | "admin";
}

export interface GetUsersResponse {
  status: "Success" | "Failed";
  data: [AdminGottenUser] | string;
}