import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Order } from '../../models/order';
import { CustomerInfo } from '../../models/customer.info';
import { CustomerStore } from 'src/app/stores/customer.store';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {

  selectedOrder: Order;
  orderForm: FormGroup;
  modalRef: BsModalRef;
  customer$: Observable<CustomerInfo>;

  constructor(
    private formBuilder: FormBuilder, 
    private modalService: BsModalService, 
    private customerStore: CustomerStore,
    private alertService: AlertService) {
      this.customerStore.init();
     }

  ngOnInit() {
    this.customer$ = this.customerStore.getAll$();
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
    this.selectedOrder = order;
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
    this.customerStore.updateOrder(order);
    this.modalRef.hide();
    this.alertService.success(`${order.product} order quantity updated from ${this.selectedOrder.quantity} to ${order.quantity}.`);
  };

}
