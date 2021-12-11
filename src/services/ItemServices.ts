import axios from "axios";
import { GetAllItemsResponse, GetItemResponse } from "../interfaces/ItemsInterfaces";
import { API_URL } from "../utils/constants";
import { axiosConfig } from "../utils/utils";

export const getAllItems = async (): Promise<GetAllItemsResponse> => {
  const res = await axios.get<GetAllItemsResponse>(API_URL + "/items", axiosConfig());

  return res.data;
};

export const getItem = async (id: string): Promise<GetItemResponse> => {
  const res = await axios.get<GetItemResponse>(API_URL + `/items/${id}`, axiosConfig());

  return res.data;
};
