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
