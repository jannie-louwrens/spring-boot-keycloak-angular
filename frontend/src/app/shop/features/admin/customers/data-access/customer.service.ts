import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { CustomerInfo } from "./customer.info";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private customersApiUrl = "/shop/api/customers";
  private headers = new HttpHeaders().set("Content-Type", "application/json");

  public customers$ = this.http.get<CustomerInfo[]>(this.customersApiUrl, {
    headers: this.headers,
  });

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<CustomerInfo[]> {
    return this.http.get<CustomerInfo[]>(this.customersApiUrl, {
      headers: this.headers,
    });
  }

  getCustomerByUsername(username: string): Observable<CustomerInfo> {
    const params = new HttpParams().set("username", username);
    return this.http
      .get<CustomerInfo>(this.customersApiUrl, {
        headers: this.headers,
        params,
      })
      .pipe(
        map((customers) => {
          return customers[0];
        })
      );
  }
}
