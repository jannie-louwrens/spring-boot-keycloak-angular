import { Component, NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { combineLatest, map, startWith } from "rxjs";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorInterceptor } from "./interceptors/http-error.interceptor";

import { SharedModule } from "../shared/shared.module";
import { AuthModule } from "../auth/auth.module";
import { AppAuthGuard } from "../auth/app-auth.guard";

import { AlertComponent } from "./ui/alert/alert.component";
import { HeaderComponent } from "./ui/header/header.component";
import { ShopFacadeService } from "./data-access/shop-facade.service";
import { OrderService } from "./features/admin/orders/data-access/order.service";
import { AlertService } from "./data-access/alert.service";

@Component({
  selector: "app-store-front",
  template: `
    <clr-main-container>
      <app-alert
        *ngIf="notificationMessage$ | async as message"
        [message]="message"
      ></app-alert>
      <app-header
        [customerOrderCount]="customerOrderCount$ | async"
      ></app-header>

      <div class="content-container">
        <main class="content-area"><router-outlet></router-outlet></main>
        <clr-vertical-nav
          [clrVerticalNavCollapsible]="false"
          [clr-nav-level]="2"
          *ngIf="userProfile$ | async as userProfile"
        >
          <div class="clr-row clr-align-self-center">
            <cds-icon shape="user" size="xxl"></cds-icon>
          </div>
          <div class="clr-row  clr-align-self-center">
            <h4>{{ userProfile.firstName }} {{ userProfile.lastName }}</h4>
          </div>
          <div class="clr-row  clr-align-self-center">
            {{ userProfile.username }}
          </div>

          <div class="nav-divider"></div>

          <a clrVerticalNavLink routerLink="shopping" routerLinkActive="active"
            ><cds-icon shape="shopping-bag" clrVerticalNavIcon></cds-icon>
            Shopping
          </a>
          <clr-vertical-nav-group
            routerLinkActive="active"
            *ngIf="userProfile.isAdministrator"
          >
            <cds-icon shape="administrator" clrVerticalNavIcon></cds-icon>
            Administrator
            <clr-vertical-nav-group-children>
              <a
                clrVerticalNavLink
                routerLink="/admin/customers"
                routerLinkActive="active"
                ><cds-icon shape="users" clrVerticalNavIcon></cds-icon>
                Customers
              </a>
              <a
                clrVerticalNavLink
                routerLink="/admin/orders"
                routerLinkActive="active"
                ><cds-icon shape="file-group" clrVerticalNavIcon></cds-icon>
                Orders
              </a>
            </clr-vertical-nav-group-children>
          </clr-vertical-nav-group>

          <a clrVerticalNavLink (click)="doLogout(true)"
            ><cds-icon shape="logout" clrVerticalNavIcon></cds-icon> Logout
          </a>
        </clr-vertical-nav>
      </div>
    </clr-main-container>
  `,
  styles: [],
})
export class ShopComponent {
  readonly notificationMessage$ = this.shopFacadeService.notificationMessage$;
  readonly userProfile$ = this.shopFacadeService.userProfile$;
  readonly customerOrderCount$ = this.shopFacadeService.customerOrderCount$;

  vm$ = combineLatest([this.userProfile$, this.customerOrderCount$])
    .pipe(
      map(([userProfile, customerOrderCount]) => ({
        userProfile,
        customerOrderCount,
      }))
    )
    .pipe(startWith({}));

  constructor(private shopFacadeService: ShopFacadeService) {}

  doLogout(logout: boolean) {
    this.shopFacadeService.logout();
  }
}

const routes: Routes = [
  {
    path: "",
    component: ShopComponent,
    children: [
      {
        path: "shopping",
        loadChildren: () =>
          import("./features/store/store-feature.component").then(
            (m) => m.StoreFeatureModule
          ),
        canActivate: [AppAuthGuard],
      },
      {
        path: "cart",
        loadChildren: () =>
          import("./features/cart/cart-feature.component").then(
            (m) => m.CartFeatureModule
          ),
        canActivate: [AppAuthGuard],
      },
      {
        path: "admin",
        loadChildren: () =>
          import("./features/admin/admin-feature.module").then(
            (m) => m.AdminFeatureModule
          ),
        canActivate: [AppAuthGuard],
        data: { roles: ["admin"] },
      },
      { path: "", pathMatch: "full", redirectTo: "shopping" },
    ],
  },
  { path: "**", redirectTo: "shopping" },
];

@NgModule({
  declarations: [ShopComponent, HeaderComponent, AlertComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    DatePipe,
    AlertService,
    OrderService,
    ShopFacadeService,
  ],
  exports: [RouterModule],
})
export class ShopFeatureModule {}
