import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {

  customers: Customer[] = [];

  constructor(
    private orderService: OrderService, 
    private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers().pipe(
      tap(data => this.customers = data),
      flatMap(customers => from(customers)),
      flatMap(customer => {
        return this.orderService.getOrdersByCustomer(customer.username).pipe(
          tap((orders: Order[]) => {
            customer.orders = orders;
          }, error => {
            console.log(error);
          })
        )
      })
     ).subscribe();
  }

}
