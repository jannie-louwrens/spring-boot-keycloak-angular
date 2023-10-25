import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Order } from '../models/order';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = "/shop/api/orders";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrdersByCustomer(customerId: string): Observable<Order[]> {
    const params = new HttpParams().set('customerId', customerId);
    return this.http.get<Order[]>(apiUrl, {headers, params});
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(apiUrl, {headers});
  }

  createOrder (customerId: string, order: Order): Observable<Order> {
    const params = new HttpParams().set('customerId', customerId);
    return this.http.post<Order>(apiUrl, order, {headers, params});
  }
  
  updateOrder (id: string, order: Order): Observable<Order> {
    return this.http.put<Order>(`${apiUrl}/${id}`, order, {headers});
  }

}
