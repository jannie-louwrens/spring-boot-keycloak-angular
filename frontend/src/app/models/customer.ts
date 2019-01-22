import { Order } from './order';

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    orders: Order[];
}
