import axios from "axios";
import { GetAllReviewsResponse } from "../interfaces/ReviewsInterfaces";
import { API_URL } from "../utils/constants";
import { axiosConfig } from "../utils/utils";

export const getAllReviews = async (id: string): Promise<GetAllReviewsResponse> => {
  const res = await axios.get<GetAllReviewsResponse>(API_URL + `/items/${id}/reviews`, axiosConfig());
  
  return res.data;
};
