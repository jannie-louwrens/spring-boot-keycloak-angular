
import { Injectable } from '@angular/core';
import { tap, map, flatMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { KeycloakService } from 'keycloak-angular';

import { Store } from './store';
import { CustomerInfo } from '../models/customer.info';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class CustomerStore extends Store<CustomerInfo> {
  constructor(
      private keycloakService: KeycloakService,
      private orderService: OrderService) {
    super();
  }

  init = (): void => {
    if (this.getAll()) { return; }

    if (this.keycloakService.isLoggedIn()) {
        from(this.keycloakService.loadUserProfile()).pipe(
            tap(this.store),
            map(() => {
                this.getAll().isLoggedIn = true;
                this.getAll().isAdministrator = this.keycloakService.isUserInRole("admin");
            }),
            flatMap(() => {
              return this.orderService.getOrdersByCustomer(this.getAll().username).pipe(
                tap((orders: Order[]) => {
                  this.getAll().orders = orders;
                })
              )
            })
        ).subscribe();
    }
  }

  logout = async (): Promise<void> => {
    await this.keycloakService.logout();
    this.store(undefined);
  }

  login(): void {
    this.keycloakService.login();
    this.init();
  }

  addOrder(order: Order) {
    this.orderService.createOrder(this.getAll().username, order)
    .subscribe(order => {
        this.getAll().orders.push(order);
        this.store(this.getAll());
      });
  }

  updateOrder(order: Order) {
    this.orderService.updateOrder(order.id, order).pipe(
      tap(resOrder => {
        let orders = this.getAll().orders;
        let orderIndex = this.getAll().orders.findIndex(item => item.id === order.id);

        orders[orderIndex] = {
          quantity: resOrder.quantity,
          ...order
        };

        this.store(this.getAll());
      })
    ).subscribe();
  }

}
