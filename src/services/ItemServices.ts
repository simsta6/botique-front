import axios from "axios";
import { GetAllItemsResponse } from "../interfaces/ItemsInterfaces";
import { API_URL } from "../utils/constants";
import { axiosConfig } from "../utils/utils";

export const getAllItems = async (): Promise<GetAllItemsResponse> => {
  const res = await axios.get<GetAllItemsResponse>(API_URL + "/items", axiosConfig());

  return res.data;
};
