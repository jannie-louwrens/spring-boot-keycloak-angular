import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CustomerInfo } from "src/app/models/customer.info";
import { CustomerStore } from "src/app/stores/customer.store";

@Component({
  selector: "app-header",
  template: `
    <clr-header class="header-4">
      <div class="branding">
        <a class="nav-link" routerLink="/">
          <span class="title"
            ><cds-icon shape="store" solid size="lg"></cds-icon>Shop</span
          >
        </a>
      </div>
      <div
        class="header-nav"
        [clr-nav-level]="1"
        *ngIf="
          (customer$ | async)?.isLoggedIn &&
          (customer$ | async)?.isAdministrator
        "
      >
        <a
          class="nav-link nav-text"
          routerLink="/orders"
          routerLinkActive="active"
          >Orders</a
        >
        <a
          class="nav-link nav-text"
          routerLink="/customers"
          routerLinkActive="active"
          >Customers</a
        >
      </div>
      <div class="header-actions">
        <a
          class="nav-link nav-icon"
          routerLink="/cart"
          routerLinkActive="active"
        >
          <cds-icon
            shape="shopping-cart"
            size="lg"
            *ngIf="!(customer$ | async)?.orders?.length"
          ></cds-icon>
          <cds-icon
            shape="shopping-cart"
            badge="danger"
            size="lg"
            *ngIf="(customer$ | async)?.orders?.length"
          ></cds-icon>
        </a>
        <clr-dropdown
          *ngIf="(customer$ | async)?.isLoggedIn; else templateForNotLoggedIn"
        >
          <button clrDropdownTrigger>
            <cds-icon shape="user" size="md"></cds-icon>
            <cds-icon shape="angle" direction="down" size="sm"></cds-icon>
          </button>
          <clr-dropdown-menu clrPosition="bottom-right" *clrIfOpen>
            <label class="dropdown-header"
              >{{ (customer$ | async)?.firstName }}
              {{ (customer$ | async)?.lastName }}
            </label>
            <label class="dropdown-header">
              <small class="text-secondary">{{
            (customer$ | async)?.username
              }}</small>
            </label>
            <div class="dropdown-divider" role="separator"></div>
            <div clrDropdownItem>
              <a
                class="dropdown-item"
                (click)="doLogout()"
                style="cursor: pointer"
                >Log out</a
              >
            </div>
          </clr-dropdown-menu>
        </clr-dropdown>
        <ng-template #templateForNotLoggedIn>
          <button class="btn btn-inverse" (click)="doLogin()">Login</button>
        </ng-template>
      </div>
    </clr-header>
  `,
  styles: [],
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  customer$: Observable<CustomerInfo>;

  constructor(private router: Router, private customerStore: CustomerStore) {
    this.customerStore.init();
  }

  ngOnInit() {
    this.customer$ = this.customerStore.getAll$();
  }

  doLogin(): void {
    this.customerStore.login();
  }

  async doLogout() {
    await this.router.navigate(["/"]);
    await this.customerStore.logout();
  }
}
