import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap, tap } from 'rxjs/operators';

import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { CustomerService } from '../../services/customer.service';
import { CustomerInfo } from '../../models/customer.info';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styles: []
})
export class CustomerOrdersComponent implements OnInit {

  customer: CustomerInfo;

  constructor(
    private route: ActivatedRoute, 
    private customerService: CustomerService, 
    private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrdersByUsername(this.route.snapshot.params['username']);
  }

  loadOrdersByUsername(username: string) {
    this.customerService.getCustomerByUsername(username).pipe(
      tap(data => this.customer = data),
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
