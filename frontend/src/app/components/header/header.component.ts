import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CustomerInfo } from "src/app/models/customer.info";
import { CustomerStore } from "src/app/stores/customer.store";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: [
    `
      .count {
        padding: 2px 3px;
        z-index: 15;
        position: relative;
        left: -5px;
        top: -12px;
      }
    `,
  ],
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
