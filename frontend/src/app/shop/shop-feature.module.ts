import { Component, NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AppAuthGuard } from "../app-auth.guard";

import { SharedModule } from "../shared/shared.module";
import { TwoDigitDecimalNumberDirective } from "./directives/two-digit-decimal-number.directive";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomerStore } from "../stores/customer.store";
import { StoreFrontFacadeService } from "./services/store-front-facade.service";

@Component({
  selector: "app-store-front",
  template: `
    <div class="content-container">
      <div class="content-area"><router-outlet></router-outlet></div>
    </div>
  `,
  styles: [],
})
export class StoreFrontComponent {}

const routes: Routes = [
  {
    path: "",
    component: StoreFrontComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./product-catalog/product-catalog-feature.component").then(
            (m) => m.ProductCatalogFeatureModule
          ),
        canActivate: [AppAuthGuard],
      },
      {
        path: "customers",
        loadChildren: () =>
          import("./customers/customers-feature.component").then(
            (m) => m.CustomersFeatureModule
          ),
        canActivate: [AppAuthGuard],
        data: { roles: ["admin"] },
      },
      {
        path: "orders",
        loadChildren: () =>
          import("./orders/orders-feature.component").then(
            (m) => m.OrdersFeatureModule
          ),
        canActivate: [AppAuthGuard],
        data: { roles: ["admin"] },
      },
      {
        path: "customerorders/:username",
        loadChildren: () =>
          import("./customer-orders/customer-orders.component").then(
            (m) => m.CustomerOrdersFeatureModule
          ),
        canActivate: [AppAuthGuard],
        data: { roles: ["admin"] },
      },
      {
        path: "cart",
        loadChildren: () =>
          import("./cart/cart-feature.component").then(
            (m) => m.CartFeatureModule
          ),
        canActivate: [AppAuthGuard],
      },
    ],
  },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  declarations: [StoreFrontComponent, TwoDigitDecimalNumberDirective],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe, CustomerStore, StoreFrontFacadeService],
  exports: [RouterModule],
})
export class ShopFeatureModule {}
