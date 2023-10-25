import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { ProductCatalog } from "./product-catalog";

@Injectable()
export class ProductCatalogService {
  private apiUrl = "/shop/api/productcatalogs";

  constructor(private http: HttpClient) {}

  public productCatalogs$ = this.http.get<ProductCatalog[]>(this.apiUrl, {
    headers: { "Content-Type": "application/json" },
  });
}
