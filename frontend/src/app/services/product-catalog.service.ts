import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProductCatalog } from '../models/product-catalog';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = "/shop/api/productcatalogs";

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {

  constructor(private http: HttpClient) { }

  getProductCatalogs (): Observable<ProductCatalog[]> {
    return this.http.get<ProductCatalog[]>(apiUrl, {headers});
  }
  
  getProductCatalog(id: string): Observable<ProductCatalog> {
    return this.http.get<ProductCatalog>(`${apiUrl}/${id}`, {headers});
  }
  
  createProductCatalog (productCatalog: ProductCatalog): Observable<ProductCatalog> {
    return this.http.post<ProductCatalog>(apiUrl, productCatalog, {headers});
  }
  
  updateProductCatalog (id: string, productCatalog: ProductCatalog): Observable<ProductCatalog> {
    return this.http.put<ProductCatalog>(`${apiUrl}/${id}`, productCatalog, {headers});
  }

}
