import { Component, OnInit, TemplateRef } from '@angular/core';
import { flatMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { KeycloakService } from 'keycloak-angular';

import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {

  customer: Customer;
  selectedOrder: Order;
  orderForm: FormGroup;
  modalRef: BsModalRef;

  constructor(
    private orderService: OrderService, 
    private formBuilder: FormBuilder, 
    private modalService: BsModalService, 
    private keycloakService: KeycloakService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    from(this.keycloakService.loadUserProfile()).pipe(
      tap(userProfile => {
        this.customer = {
          id: userProfile.id,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          username: userProfile.username,
          email: userProfile.email
        } as Customer;
      }),
      flatMap(() => {
        return this.orderService.getOrdersByCustomer(this.customer.username).pipe(
          tap((orders: Order[]) => {
            this.customer.orders = orders;
          }, error => {
            console.log(error);
          })
        )
      })
     ).subscribe();
  }

  openEditOrderModal(template: TemplateRef<any>, order: Order) {
    let dp = new DatePipe(navigator.language);
    let p = 'y-MM-dd'; // YYYY-MM-DD
    let dtr = dp.transform(order.orderDate, p);
    this.orderForm = this.formBuilder.group({
      'id' : order.id,
      'customerId': order.customerId,
      'product' : [{value: order.product, disabled: true}],
      'productCatalog' : [{value: order.productCatalog, disabled: true}],
      'unitPrice' : [{value: order.unitPrice, disabled: true}],
      'orderDate' : [{value: dtr, disabled: true}],
      'quantity' : [order.quantity, Validators.required]
    });
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.orderForm.controls; 
  }

  onUpdateOrder() {
    // stop here if form is invalid
    if (this.orderForm.invalid) {
      return;
    }
    let order = <Order>this.orderForm.getRawValue();
    this.orderService.updateOrder(order.id, order)
      .subscribe(res => {
          // this.getCustomerOrders(this.customer.username);
          this.orderService.getOrdersByCustomer(this.customer.username).pipe(
            tap((orders: Order[]) => {
              this.customer.orders = orders;
            }, error => {
              console.log(error);
            })
          ).subscribe();
          this.modalRef.hide();
        }, (err) => {
          console.log(err);
        });
  };

}
