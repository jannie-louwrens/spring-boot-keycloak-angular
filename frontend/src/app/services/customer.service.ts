import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap, map} from 'rxjs/operators';

import { Customer } from '../models/customer';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = "/shop/api/customers";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers (): Observable<Customer[]> {
    return this.http.get<Customer[]>(apiUrl, {headers})
      .pipe(
        tap(customers => console.log('fetched customers')),
        catchError(this.handleError('getCustomers', []))
      );
  }

  getCustomerByUsername(username: string): Observable<Customer> {
    const params = new HttpParams().set('username', username);
    return this.http.get<Customer>(apiUrl, {headers, params})
      .pipe(
        map(customers => {
          return customers[0];
        }),
        catchError(this.handleError<Customer>(`getCustomerByUsername username=${username}`))
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
