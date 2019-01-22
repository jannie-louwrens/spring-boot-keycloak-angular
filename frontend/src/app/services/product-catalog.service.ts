import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { ProductCatalog } from '../models/product-catalog';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const apiUrl = "/shop/api/productcatalogs";

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {

  constructor(private http: HttpClient) { }

  getProductCatalogs (): Observable<ProductCatalog[]> {
    return this.http.get<ProductCatalog[]>(apiUrl, {headers})
      .pipe(
        tap(productCatalogs => console.log('fetched productCatalog')),
        catchError(this.handleError('getProductCatalogs', []))
      );
  }
  
  getProductCatalog(id: string): Observable<ProductCatalog> {
    return this.http.get<ProductCatalog>(`${apiUrl}/${id}`, {headers}).pipe(
      tap(_ => console.log(`fetched productCatalog id=${id}`)),
      catchError(this.handleError<ProductCatalog>(`getProductCatalog id=${id}`))
    );
  }
  
  createProductCatalog (productCatalog: ProductCatalog): Observable<ProductCatalog> {
    return this.http.post<ProductCatalog>(apiUrl, productCatalog, {headers}).pipe(
      tap((productCatalog: ProductCatalog) => console.log(`added product w/ id=${productCatalog.id}`)),
      catchError(this.handleError<ProductCatalog>('createProductCatalog'))
    );
  }
  
  updateProductCatalog (id: string, productCatalog: ProductCatalog): Observable<ProductCatalog> {
    return this.http.put<ProductCatalog>(`${apiUrl}/${id}`, productCatalog, {headers}).pipe(
      tap(_ => console.log(`updated productCatalog id=${id}`)),
      catchError(this.handleError<ProductCatalog>('updateProductCatalog'))
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
