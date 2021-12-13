export interface Review {
  _id: string;
  user: string;
  item: string;
  rating: number;
  comment: string;
}

export interface GetAllReviewsResponse {
  status: "Success" | "Failed";
  data: [Review] | string;
}

export interface GetReviewResponse {
  status: "Success" | "Failed";
  data: Review | string;
}

export interface PostReviewResponse {
  status: "Success" | "Failed";
  data: Review | string;
}

export type EditReviewResponse = PostReviewResponse;

export interface ReviewData {
  rating: number;
  comment: string;
}