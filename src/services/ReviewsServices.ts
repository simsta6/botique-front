import axios from "axios";
import { EditReviewResponse, GetAllReviewsResponse, GetReviewResponse, PostReviewResponse, ReviewData } from "../interfaces/ReviewsInterfaces";
import { API_URL } from "../utils/constants";
import { axiosConfig } from "../utils/utils";

export const getAllReviews = async (itemId: string): Promise<GetAllReviewsResponse> => {
  const res = await axios.get<GetAllReviewsResponse>(API_URL + `/items/${itemId}/reviews`, axiosConfig());
  
  return res.data;
};

export const getReview = async (itemId: string, reviewId: string): Promise<GetReviewResponse> => {
  const res = await axios.get<GetReviewResponse>(API_URL + `/items/${itemId}/reviews/${reviewId}`, axiosConfig());
  
  return res.data;
};

export const deleteReview = async (itemId: string, reviewId: string): Promise<boolean> => {
  const res = await axios.delete(API_URL + `/items/${itemId}/reviews/${reviewId}`, axiosConfig());

  return res.status === 200;
};

export const editReview = async (itemId: string, data: ReviewData, reviewId: string): Promise<EditReviewResponse> => {
  const res = await axios.patch<EditReviewResponse>(API_URL + `/items/${itemId}/reviews/${reviewId}`, data, axiosConfig());

  return res.data;
};

export const postReview = async (itemId: string, data: ReviewData): Promise<PostReviewResponse> => {
  const res = await axios.post<PostReviewResponse>(API_URL + `/items/${itemId}/reviews`, data, axiosConfig());

  return res.data;
};
