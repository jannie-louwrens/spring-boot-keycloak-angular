import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { combineLatest, map } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { Product } from "./data-access/product";
import { ProductService } from "./data-access/product.service";
import { StoreFacadeService } from "./data-access/store-facade.service";

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
                <select clrSelect (change)="onSelected($event.target.value)">
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
                      >{{ product.unitPrice | number: "1.2-2" }}
                    </p>
                  </div>
                  <div class="card-footer">
                    <button
                      class="btn btn-sm btn-link"
                      (click)="addToCart(product)"
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
  providers: [StoreFacadeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreComponent {
  readonly productCategories$ = this.storeFacadeService.productCategories$;
  readonly products$ = this.storeFacadeService.products$;

  vm$ = combineLatest([this.products$, this.productCategories$]).pipe(
    map(([products, productCategories]) => {
      return { products, productCategories };
    })
  );

  constructor(private storeFacadeService: StoreFacadeService) {}

  onSelected(productCategoryId: string): void {
    this.storeFacadeService.changeProductCategoryId(productCategoryId);
  }

  addToCart(product: Product) {
    this.storeFacadeService.addToCart(product);
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
  providers: [ProductService],
  declarations: [StoreComponent],
})
export class StoreFeatureModule {}
