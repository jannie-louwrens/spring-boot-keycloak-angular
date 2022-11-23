import { CommonModule } from "@angular/common";
import { Component, NgModule, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ProductCatalogService } from "../../services/product-catalog.service";
import { ProductCatalog } from "../../models/product-catalog";
import { ProductFeatureModule } from "../product/product-feature.component";

@Component({
  selector: "app-product-catalog",
  template: `
    <div class="clr-row">
      <div class="clr-col-lg-4 clr-col-12">
        <div class="card">
          <div class="card-block">
            <h3 class="card-title">Product Catalog</h3>
            <p class="card-text">Select a category</p>
          </div>
          <div class="card-block">
            <ul class="list-unstyled">
              <li *ngIf="productCatalogs.length == 0">
                <strong>No product catalogs found</strong>
              </li>
              <li
                style="cursor: pointer"
                *ngFor="let productCatalog of productCatalogs"
                (click)="changeProductCatalog(productCatalog)"
              >
                {{ productCatalog.name }}
                <cds-icon
                  shape="check-circle"
                  status="success"
                  size="md"
                  *ngIf="
                    !!selectedProductCatalog &&
                    productCatalog.id === selectedProductCatalog.id
                  "
                ></cds-icon>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="clr-col-lg-8 clr-col-12">
        <app-product
          *ngIf="!!selectedProductCatalog"
          [productCatalogId]="selectedProductCatalog.id"
          [productCatalogName]="selectedProductCatalog.name"
        >
        </app-product>
      </div>
    </div>
  `,
  styles: [],
})
export class ProductCatalogComponent implements OnInit {
  selectedProductCatalog: ProductCatalog;
  productCatalogs: ProductCatalog[] = [];

  constructor(private productCatalogService: ProductCatalogService) {}

  ngOnInit() {
    this.productCatalogService.getProductCatalogs().subscribe((data) => {
      this.productCatalogs = data;
    });
  }

  changeProductCatalog(productCatalog: ProductCatalog) {
    this.selectedProductCatalog = productCatalog;
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", pathMatch: "full", component: ProductCatalogComponent },
    ]),
    ProductFeatureModule,
  ],
  declarations: [ProductCatalogComponent],
})
export class ProductCatalogFeatureModule {}
