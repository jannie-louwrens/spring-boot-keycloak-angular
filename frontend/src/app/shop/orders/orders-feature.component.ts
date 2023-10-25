import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Component, NgModule, OnInit } from "@angular/core";
import { from } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";

import { OrderService } from "../../services/order.service";
import { Order } from "../../models/order";
import { CustomerService } from "../../services/customer.service";
import { CustomerInfo } from "../../models/customer.info";

@Component({
  selector: "app-orders",
  template: `
    <div *ngFor="let customer of customers">
      <table class="table">
        <caption>
          <cds-icon shape="shopping-bag" size="lg"></cds-icon>
          Orders for
          {{
        customer.firstName
          }}
          {{
        customer.lastName
          }}
        </caption>
        <thead>
          <tr>
            <th scope="col" class="left">Product</th>
            <th scope="col" class="left">Product Catalog</th>
            <th scope="col" style="width: 100px">Date</th>
            <th scope="col" style="width: 100px">Quantity</th>
            <th scope="col" style="width: 100px">Unit Price</th>
            <th scope="col" style="width: 100px">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="!!customer.orders && customer.orders.length == 0">
            <td colspan="7" class="table-light">
              <strong>No orders found</strong>
            </td>
          </tr>
          <tr *ngFor="let order of customer.orders">
            <td class="left">{{ order.product }}</td>
            <td class="left">{{ order.productCatalog }}</td>
            <td>{{ order.orderDate | date: "yyyy-MM-dd" }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.unitPrice | number: "1.2-2" }}</td>
            <td>
              {{ order.quantity * order.unitPrice | number: "1.2-2" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class OrdersComponent implements OnInit {
  customers: CustomerInfo[] = [];

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.customerService
      .getCustomers()
      .pipe(
        tap((data) => (this.customers = data)),
        mergeMap((customers) => from(customers)),
        mergeMap((customer) => {
          return this.orderService.getOrdersByCustomer(customer.username).pipe(
            tap((orders: Order[]) => {
              customer.orders = orders;
            })
          );
        })
      )
      .subscribe();
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", pathMatch: "full", component: OrdersComponent },
    ]),
  ],
  declarations: [OrdersComponent],
})
export class OrdersFeatureModule {}
