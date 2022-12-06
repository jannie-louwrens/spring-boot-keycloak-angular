import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { combineLatest, map } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { Product } from "../../data-access/product";
import { ShopFacadeService } from "../../data-access/shop-facade.service";
import { CartFacadeService } from "../cart/data-access/cart-facade.service";

@Component({
  selector: "app-store",
  template: `
    <div class="clr-row">
      <div class="clr-col-12">
        <div class="card">
          <h3 class="card-header">Product List</h3>
          <div class="card-block" *ngIf="vm$ | async as vm">
            <div class="card-text">
              <clr-select-container>
                <label>Filter by category:</label>
                <select
                  clrSelect
                  (change)="onCategorySelection($event.target.value)"
                >
                  <option value="">- Display All -</option>
                  <option
                    *ngFor="let category of vm.productCategories"
                    [value]="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </clr-select-container>
            </div>

            <div
              class="clr-row"
              *ngIf="
                !!vm.products && vm.products.length > 0;
                else elseNoProducts
              "
            >
              <div
                class="clr-col-lg-3 clr-col-12"
                *ngFor="let product of vm.products"
              >
                <div class="card">
                  <div class="card-block">
                    <h3 class="card-title">{{ product.name }}</h3>
                    <p class="card-text" [style.height]="'4rem'">
                      {{ product.description }}
                    </p>
                    <p class="card-text">
                      <span class="p2">Unit Price: </span
                      >{{ product.unitPrice | number : "1.2-2" }}
                    </p>
                  </div>
                  <div class="card-footer">
                    <button
                      class="btn btn-sm btn-link"
                      (click)="onAddToCart(product)"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <ng-template #elseNoProducts
              ><div class="clr-row">
                <div class="card">
                  <div class="card-block">
                    <div class="alert alert-warning alert-sm">
                      <div class="alert-items">
                        <div class="alert-item static">
                          <div class="alert-icon-wrapper">
                            <cds-icon
                              class="alert-icon"
                              shape="exclamation-triangle"
                            ></cds-icon>
                          </div>
                          <div class="alert-text">No products found.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div></ng-template
            >
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class StoreComponent {
  readonly productCategories$ = this.shopFacadeService.productCategories$;
  readonly products$ = this.shopFacadeService.products$;

  vm$ = combineLatest([this.products$, this.productCategories$]).pipe(
    map(([products, productCategories]) => {
      return { products, productCategories };
    })
  );

  constructor(
    private shopFacadeService: ShopFacadeService,
    private cartFacadeService: CartFacadeService
  ) {}

  onCategorySelection(productCategoryId: string): void {
    this.shopFacadeService.changeProductCategoryId(productCategoryId);
  }

  onAddToCart(product: Product) {
    this.cartFacadeService.addToCart(product);
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", pathMatch: "full", component: StoreComponent },
    ]),
    SharedModule,
  ],
  declarations: [StoreComponent],
})
export class StoreFeatureModule {}
