export interface AddItemToChartResponse {
  status: "Success" | "Failed";
  data: {
    _id: string;
    user: string;
    items: [{
      item: string;
      count: number
    }]
  } | string;
}
