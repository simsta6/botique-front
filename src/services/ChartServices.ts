import axios from "axios";
import { AddItemToChartResponse, GetAllItemsInChartResponse } from "../interfaces/ChartInterfaces";
import { API_URL } from "../utils/constants";
import { axiosConfig } from "../utils/utils";

export const addItemToChart = async (id: string): Promise<void> => {
  await axios.post<AddItemToChartResponse>(API_URL + `/charts/${id}/1`, axiosConfig());
};

export const getAllItemsInChart = async (): Promise<GetAllItemsInChartResponse> => {
  const res = await axios.get<GetAllItemsInChartResponse>(API_URL + "/charts", axiosConfig());

  return res.data;
};

