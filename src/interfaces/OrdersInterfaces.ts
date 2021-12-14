export interface OrderForSeller {
  _id: string;
  user: string;
  items: [{
    item: string;
    count: number
  }];
  state: string;
}

export interface GetAllOrdersResponse {
  status: "Success" | "Failed";
  data: [OrderForSeller] | string;
}

export enum OrderStateEnum {
  PENDING = "pending",
  PAID = "paid",
  APPROVED = "approved",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

export type OrderStateType = keyof typeof OrderStateEnum