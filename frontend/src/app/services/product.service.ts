import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { Product } from '../models/product';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = "/shop/api/products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient, 
    private datePipe: DatePipe) { }

  getProductsByProductCatalog(productCatalogId: string): Observable<Product[]> {
    const params = new HttpParams().set('productCatalogId', productCatalogId);
    return this.http.get<Product[]>(apiUrl, {headers, params});
  }

  getEffectiveProductsByProductCatalogOnDate(productCatalogId: string, date: Date): Observable<Product[]> {
    const params = new HttpParams().set('productCatalogId', productCatalogId).append('date', this.datePipe.transform(date, 'yyyy-MM-dd'));
    return this.http.get<Product[]>(apiUrl, {headers, params});
  }

  createProduct (productCatalogId: string, product: Product): Observable<Product> {
    const params = new HttpParams().set('productCatalogId', productCatalogId);
    return this.http.post<Product>(apiUrl, product, {headers, params});
  }
  
  updateProduct (id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${apiUrl}/${id}`, product, {headers});
  }

}
