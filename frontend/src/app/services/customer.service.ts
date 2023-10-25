import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map} from 'rxjs/operators';

import { CustomerInfo } from '../models/customer.info';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = "/shop/api/customers";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers (): Observable<CustomerInfo[]> {
    return this.http.get<CustomerInfo[]>(apiUrl, {headers});
  }

  getCustomerByUsername(username: string): Observable<CustomerInfo> {
    const params = new HttpParams().set('username', username);
    return this.http.get<CustomerInfo>(apiUrl, {headers, params})
      .pipe(
        map(customers => {
          return customers[0];
        })
      );
  }

}
