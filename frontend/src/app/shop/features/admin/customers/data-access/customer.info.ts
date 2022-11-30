import { Order } from "../../orders/data-access/order";

export interface CustomerInfo {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  orders?: Order[];
}
