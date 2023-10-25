import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { Order } from "./order";

@Injectable()
export class OrderService {
  private ordersApiUrl = "/shop/api/orders";
  private headers = new HttpHeaders().set("Content-Type", "application/json");

  private customerSubject = new BehaviorSubject<string>(null);
  private readonly customerSource$ = this.customerSubject.asObservable();

  constructor(private http: HttpClient) {}

  public changeSelectedCustomerId(customerId: string): void {
    this.customerSubject.next(customerId);
  }

  public orders$ = this.http.get<Order[]>(this.ordersApiUrl, {
    headers: this.headers,
  });

  public ordersByCustomer$ = this.customerSource$.pipe(
    switchMap((customerId) => {
      const params = new HttpParams().set("customerId", customerId);
      return this.http.get<Order[]>(this.ordersApiUrl, {
        headers: this.headers,
        params,
      });
    })
  );

  getOrdersByCustomer(customerId: string): Observable<Order[]> {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.get<Order[]>(this.ordersApiUrl, {
      headers: this.headers,
      params,
    });
  }

  createOrder(customerId: string, order: Order): Observable<Order> {
    const params = new HttpParams().set("customerId", customerId);
    return this.http.post<Order>(this.ordersApiUrl, order, {
      headers: this.headers,
      params,
    });
  }

  updateOrder(id: string, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.ordersApiUrl}/${id}`, order, {
      headers: this.headers,
    });
  }
}
