import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { combineLatest, map, shareReplay } from "rxjs";
import { Product } from "./product";
import { ProductCategory } from "./product-category";

@Injectable()
export class ProductService {
  private productCategoryApiUrl = "/shop/api/productcatalogs";
  private productApiUrl = "/shop/api/products";
  private headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  public productCategories$ = this.http
    .get<ProductCategory[]>(this.productCategoryApiUrl, {
      headers: this.headers,
    })
    .pipe(shareReplay(1));

  public products$ = this.http.get<Product[]>(this.productApiUrl, {
    headers: this.headers,
  });

  public productsWithCategory$ = combineLatest([
    this.products$,
    this.productCategories$,
  ]).pipe(
    map(([products, categories]) =>
      products.map(
        (product) =>
          ({
            ...product,
            productCategory: categories.find(
              (c) => product.productCatalogId === c.id
            )?.name,
          } as Product)
      )
    ),
    shareReplay(1)
  );
}
