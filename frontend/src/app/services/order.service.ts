import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

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
    return this.http.get<Order[]>(apiUrl, {headers, params})
      .pipe(
        tap(orders => console.log(`fetched orders by customer customerId=${customerId}`)),
        catchError(this.handleError('getProductsByCustomer', []))
      );
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(apiUrl, {headers})
      .pipe(
        tap(orders => console.log('fetched orders')),
        catchError(this.handleError('getOrders', []))
      );
  }

  createOrder (customerId: string, order: Order): Observable<Order> {
    const params = new HttpParams().set('customerId', customerId);
    return this.http.post<Order>(apiUrl, order, {headers, params}).pipe(
      tap((order: Order) => console.log(`created order w/ id=${order.id}`)),
      catchError(this.handleError<Order>('createOrder'))
    );
  }
  
  updateOrder (id: string, order: Order): Observable<Order> {
    return this.http.put(`${apiUrl}/${id}`, order, {headers}).pipe(
      tap(_ => console.log(`updated order id=${id}`)),
      catchError(this.handleError<any>('updateOrder'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
