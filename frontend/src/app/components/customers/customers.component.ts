import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { CustomerService } from '../../services/customer.service';
import { CustomerInfo } from '../../models/customer.info';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: []
})
export class CustomersComponent implements OnInit {

  customers: CustomerInfo[] = [];

  constructor(
    private customerService: CustomerService, 
    private orderService: OrderService) { }

  ngOnInit() {
    this.customerService.getCustomers().pipe(
      tap(data => this.customers = data),
      flatMap(customers => from(customers)),
      flatMap(customer => {
        return this.orderService.getOrdersByCustomer(customer.username).pipe(
          tap((orders: Order[]) => {
            customer.orders = orders;
          })
        )
      })
     ).subscribe();
  }

}
