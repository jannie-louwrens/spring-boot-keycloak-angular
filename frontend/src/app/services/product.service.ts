import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
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
    return this.http.get<Product[]>(apiUrl, {headers, params})
      .pipe(
        tap(products => console.log(`fetched getProductsByProductCatalog productCatalogId=${productCatalogId}`)),
        catchError(this.handleError('getProductsByProductCatalog', []))
      );
  }

  getEffectiveProductsByProductCatalogOnDate(productCatalogId: string, date: Date): Observable<Product[]> {
    const params = new HttpParams().set('productCatalogId', productCatalogId).append('date', this.datePipe.transform(date, 'yyyy-MM-dd'));
    return this.http.get<Product[]>(apiUrl, {headers, params})
      .pipe(
        tap(products => console.log(`fetched getProductsByProductCatalog productCatalogId=${productCatalogId}`)),
        catchError(this.handleError('getProductsByProductCatalog', []))
      );
  }

  createProduct (productCatalogId: string, product: Product): Observable<Product> {
    const params = new HttpParams().set('productCatalogId', productCatalogId);
    return this.http.post<Product>(apiUrl, product, {headers, params}).pipe(
      tap((product: Product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }
  
  updateProduct (id: string, product: Product): Observable<Product> {
    return this.http.put(`${apiUrl}/${id}`, product, {headers}).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
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
