import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";

import { Order } from "../../../models/order";
import { CustomerInfo } from "../../../models/customer.info";
import { CustomerStore } from "src/app/stores/customer.store";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: [],
  providers: [DatePipe],
})
export class CartComponent implements OnInit {
  selectedOrder: Order;
  orderForm: FormGroup;
  customer$: Observable<CustomerInfo>;
  isOpenEditOrderModal: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerStore: CustomerStore,
    private alertService: AlertService,
    private datePipe: DatePipe
  ) {
    this.customerStore.init();
  }

  ngOnInit() {
    this.customer$ = this.customerStore.getAll$();
  }

  openEditOrderModal(order: Order) {
    let dtr = this.datePipe.transform(order.orderDate, "y-MM-dd");
    this.orderForm = this.formBuilder.group({
      id: order.id,
      customerId: order.customerId,
      product: [{ value: order.product, disabled: true }],
      productCatalog: [{ value: order.productCatalog, disabled: true }],
      unitPrice: [{ value: order.unitPrice, disabled: true }],
      orderDate: [{ value: dtr, disabled: true }],
      quantity: [order.quantity, Validators.required],
    });
    this.selectedOrder = order;
    this.isOpenEditOrderModal = true;
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
    let dtr = this.datePipe.transform(order.orderDate, "y-MM-dd");
    order.orderDate = new Date(dtr);
    this.customerStore.updateOrder(order);
    this.isOpenEditOrderModal = false;
    this.alertService.success(
      `${order.product} order quantity updated from ${this.selectedOrder.quantity} to ${order.quantity}.`
    );
  }
}
