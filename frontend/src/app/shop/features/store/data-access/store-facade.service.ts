import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, map } from "rxjs";
import { AuthFacadeService } from "src/app/auth/data-access/auth-facade.service";
import { AlertService } from "src/app/shop/data-access/alert.service";
import { Order } from "../../admin/orders/data-access/order";
import { OrderService } from "../../admin/orders/data-access/order.service";
import { Product } from "./product";
import { ProductService } from "./product.service";

@Injectable()
export class StoreFacadeService {
  private categorySelectedSubject = new BehaviorSubject<string>(null);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  public readonly productCategories$ = this.productService.productCategories$;

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

  constructor(
    private productService: ProductService,
    private alertService: AlertService,
    private authFacadeService: AuthFacadeService,
    private orderService: OrderService
  ) {}

  public changeProductCategoryId(productCategoryId: string): void {
    this.categorySelectedSubject.next(productCategoryId);
  }

  public addToCart(product: Product) {
    let order = {
      product: product.name,
      productCatalog: product.productCategory,
      unitPrice: product.unitPrice,
      orderDate: new Date(),
      quantity: 1,
    } as Order;

    this.orderService
      .createOrder(this.authFacadeService.getLoginUsername(), order)
      .subscribe((order) => {
        this.alertService.success(
          `Order placed for ${order.quantity} ${order.product}.`
        );
      });
  }
}
