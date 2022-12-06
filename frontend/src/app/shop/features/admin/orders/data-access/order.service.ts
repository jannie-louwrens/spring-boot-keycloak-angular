import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Order } from "./order";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private ordersApiUrl = "/shop/api/orders";
  private headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient) {}

  public orders$ = this.http.get<Order[]>(this.ordersApiUrl, {
    headers: this.headers,
  });

  public getOrdersByCustomer(customerId: string): Observable<Order[]> {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get<Order[]>(this.ordersApiUrl, {
      headers: this.headers,
      params,
    });
  }

  public createOrder(customerId: string, order: Order): Observable<Order> {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.post<Order>(this.ordersApiUrl, order, {
      headers: this.headers,
      params,
    });
  }

  public updateOrder(id: string, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.ordersApiUrl}/${id}`, order, {
      headers: this.headers,
    });
  }
}
