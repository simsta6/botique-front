import { Item } from "./ItemsInterfaces";

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

export interface ChartItem {
  item: Item;
  count: number;
}

export interface GetAllItemsInChartResponse {
  status: "Success" | "Failed";
  data: [ChartItem] | string;
}
