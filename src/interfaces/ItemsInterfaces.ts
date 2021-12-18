export interface Item {
  _id: string;
  brand: string;
  color: string;
  count: number;
  size: number;
  price: number;
  imageUrl: string;
  seller: string;
}

export interface NewItem {
  brand: string;
  color: string;
  count: number;
  size: number;
  price: number;
  imageUrl: string;
}

export interface GetAllItemsResponse {
  status: "Success" | "Failed";
  data: [Item & {
    __v: number;
  }] | string;
}

export interface GetItemResponse {
  status: "Success" | "Failed";
  data: Item;
}
