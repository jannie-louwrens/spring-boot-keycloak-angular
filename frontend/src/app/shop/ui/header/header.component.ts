import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CustomerInfo } from "../../features/customers/data-access/customer.info";

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
        *ngIf="customer.isLoggedIn && customer.isAdministrator"
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
            *ngIf="!customer.orders?.length"
          ></cds-icon>
          <cds-icon
            shape="shopping-cart"
            badge="danger"
            size="lg"
            *ngIf="customer.orders?.length"
          ></cds-icon>
        </a>
        <clr-dropdown *ngIf="customer.isLoggedIn">
          <button clrDropdownTrigger>
            <cds-icon shape="user" size="md"></cds-icon>
            <cds-icon shape="angle" direction="down" size="sm"></cds-icon>
          </button>
          <clr-dropdown-menu clrPosition="bottom-right" *clrIfOpen>
            <label class="dropdown-header"
              >{{ customer.firstName }}
              {{ customer.lastName }}
            </label>
            <label class="dropdown-header">
              <small class="text-secondary">{{ customer.username }}</small>
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
      </div>
    </clr-header>
  `,
  styles: [],
})
export class HeaderComponent {
  @Input() customer: CustomerInfo;
  @Output() logout = new EventEmitter<boolean>();

  isCollapsed = true;

  doLogout() {
    this.logout.emit(true);
  }
}
