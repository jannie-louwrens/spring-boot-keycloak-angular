import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppAuthGuard } from "src/app/auth/app-auth.guard";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  { path: "", redirectTo: "orders", pathMatch: "full" },
  {
    path: "",
    children: [
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
        path: "customers",
        loadChildren: () =>
          import("./customers/customers-feature.component").then(
            (m) => m.CustomersFeatureModule
          ),
        canActivate: [AppAuthGuard],
        data: { roles: ["admin"] },
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class AdminFeatureModule {}
