import axios from "axios";

interface UserLoginData {
  email: string;
  password: string;
}

export interface UserLoginResponse {
    status: "Success" | "Failed";
    data: {
        _id: string;
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        role: "seller" | "buyer" | "admin";
        __v: number;
        token: string;
    } | string
}

const url = "https://botique-ss.herokuapp.com/api/login";

export const login = async (data: UserLoginData): Promise<UserLoginResponse> => {
  const config = {
    credentials: "include",
    headers: {
      "content-type": "application/json"
    },
    validateStatus: (status: number) => {
      return status >= 200 && status < 500;
    },
  };

  const res = await axios.post<UserLoginResponse>(url, data, config);

  return res.data;
};