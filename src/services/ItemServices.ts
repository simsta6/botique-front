import axios from "axios";
import { GetAllItemsResponse, GetItemResponse, NewItem } from "../interfaces/ItemsInterfaces";
import { API_URL } from "../utils/constants";
import { axiosConfig } from "./config";

export const getAllItems = async (): Promise<GetAllItemsResponse> => {
  const res = await axios.get<GetAllItemsResponse>(API_URL + "/items", axiosConfig());

  return res.data;
};

export const getItem = async (id: string): Promise<GetItemResponse> => {
  const res = await axios.get<GetItemResponse>(API_URL + `/items/${id}`, axiosConfig());

  return res.data;
};

export const postItem = async (data: NewItem): Promise<boolean> => {
  const res = await axios.post<GetItemResponse>(API_URL + "/items", data, axiosConfig());

  return res.status === 201;
};
