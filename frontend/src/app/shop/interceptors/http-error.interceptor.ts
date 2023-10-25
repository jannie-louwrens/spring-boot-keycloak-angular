import { Injectable } from "@angular/core";

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ShopFacadeService } from "../data-access/shop-facade.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private shopFacadeService: ShopFacadeService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        this.shopFacadeService.showErrorMessage(
          `${response.status}: ${response.message}`
        );
        return throwError(() => response.message);
      })
    );
  }
}
