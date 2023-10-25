import { Component, OnInit } from "@angular/core";
import { from } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";

import { CustomerService } from "../../../services/customer.service";
import { CustomerInfo } from "../../../models/customer.info";
import { OrderService } from "../../../services/order.service";
import { Order } from "../../../models/order";

@Component({
  selector: "app-customers",
  template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="left">Firstname</th>
          <th scope="col" class="left">Lastname</th>
          <th scope="col" style="width: 100px">Orders</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngIf="!!customers && customers.length == 0">
          <td colspan="3" class="table-light">
            <strong>No customers found</strong>
          </td>
        </tr>
        <tr *ngFor="let customer of customers">
          <td class="left">{{ customer.firstName }}</td>
          <td class="left">{{ customer.lastName }}</td>
          <td>
            <span *ngIf="!!customer.orders && customer.orders.length == 0"
              >0 Orders</span
            >
            <a
              [routerLink]="['/customerorders/', customer.username]"
              class="btn-link"
              *ngIf="!!customer.orders && customer.orders.length > 0"
            >
              {{ customer.orders.length }} Orders
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
})
export class CustomersComponent implements OnInit {
  customers: CustomerInfo[] = [];

  constructor(
    private customerService: CustomerService,
    private orderService: OrderService
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
