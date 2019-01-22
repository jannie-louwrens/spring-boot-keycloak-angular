export interface Order {
    id: string;
    customerId: string;
    product: string;
    productCatalog: string;
    orderDate: Date;
    quantity: number;
    unitPrice: number;
}
