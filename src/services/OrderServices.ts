import axios from "axios";
import { GetAllOrdersResponse } from "../interfaces/OrdersInterfaces";
import { API_URL } from "../utils/constants";
import { axiosConfig } from "./config";

export const makeAnOrder = async (): Promise<boolean> => {
  const res = await axios.post(API_URL + "/orders", axiosConfig());

  return res.status === 200;
};

export const changeOrderState = async (data: {state: string}, id: string): Promise<boolean> => {
  const res = await axios.patch(API_URL + `/orders/${id}`, data, axiosConfig());

  return res.status === 201;
};

export const getAllOrders = async (): Promise<GetAllOrdersResponse> => {
  const res = await axios.get<GetAllOrdersResponse>(API_URL + "/orders", axiosConfig());

  return res.data;
};


