import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, map } from "rxjs";
import { AuthFacadeService } from "src/app/auth/data-access/auth-facade.service";
import { AlertService } from "./alert.service";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: "root",
})
export class ShopFacadeService {
  public readonly notificationMessage$ = this.alertService.message$;
  public readonly loadUserProfile$ = this.authFacadeService.loadUserProfile$;
  public readonly productCategories$ = this.productService.productCategories$;

  private categorySelectedSubject = new BehaviorSubject<string>(null);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  public readonly products$ = combineLatest([
    this.productService.productsWithCategory$,
    this.categorySelectedAction$,
  ]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter((product) =>
        selectedCategoryId
          ? product.productCatalogId === selectedCategoryId
          : true
      )
    )
  );

  public changeProductCategoryId(productCategoryId: string): void {
    this.categorySelectedSubject.next(productCategoryId);
  }

  public logout(): void {
    this.authFacadeService.logout();
  }

  constructor(
    private alertService: AlertService,
    private authFacadeService: AuthFacadeService,
    private productService: ProductService
  ) {}
}
