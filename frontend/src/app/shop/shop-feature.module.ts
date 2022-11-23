import { Component, NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AppAuthGuard } from "../app-auth.guard";

import { SharedModule } from "../shared/shared.module";
import { TwoDigitDecimalNumberDirective } from "./ui/directives/two-digit-decimal-number.directive";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomerStore } from "../stores/customer.store";
import { AlertComponent } from "./ui/alert/alert.component";
import { HeaderComponent } from "./ui/header/header.component";
import { AuthModule } from "../auth/auth.module";

@Component({
  selector: "app-store-front",
  template: `
    <clr-main-container>
      <app-alert></app-alert>
      <app-header></app-header>

      <div class="content-container">
        <div class="content-area"><router-outlet></router-outlet></div>
      </div>
    </clr-main-container>
  `,
  styles: [],
})
export class ShopComponent {}

const routes: Routes = [
  {
    path: "",
    component: ShopComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import(
            "./features/product-catalog/product-catalog-feature.component"
          ).then((m) => m.ProductCatalogFeatureModule),
        canActivate: [AppAuthGuard],
      },
      {
        path: "customers",
        loadChildren: () =>
          import("./features/customers/customers-feature.component").then(
            (m) => m.CustomersFeatureModule
          ),
        canActivate: [AppAuthGuard],
        data: { roles: ["admin"] },
      },
      {
        path: "orders",
        loadChildren: () =>
          import("./features/orders/orders-feature.component").then(
            (m) => m.OrdersFeatureModule
          ),
        canActivate: [AppAuthGuard],
        data: { roles: ["admin"] },
      },
      {
        path: "customerorders/:username",
        loadChildren: () =>
          import("./features/customer-orders/customer-orders.component").then(
            (m) => m.CustomerOrdersFeatureModule
          ),
        canActivate: [AppAuthGuard],
        data: { roles: ["admin"] },
      },
      {
        path: "cart",
        loadChildren: () =>
          import("./features/cart/cart-feature.component").then(
            (m) => m.CartFeatureModule
          ),
        canActivate: [AppAuthGuard],
      },
    ],
  },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  declarations: [
    ShopComponent,
    TwoDigitDecimalNumberDirective,
    HeaderComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
  ],
  providers: [DatePipe, CustomerStore],
  exports: [RouterModule],
})
export class ShopFeatureModule {}
