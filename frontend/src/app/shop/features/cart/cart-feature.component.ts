import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ChangeDetectionStrategy, Component, NgModule } from "@angular/core";
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DatePipe } from "@angular/common";

import { Order } from "../admin/orders/data-access/order";
import { SharedModule } from "src/app/shared/shared.module";
import { CartFacadeService } from "./data-access/cart-facade.service";
import { startWith } from "rxjs";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: [],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  readonly ordersByCustomer$ = this.cartFacadeService.ordersByCustomer$.pipe(
    startWith([])
  );
  selectedOrder: Order;
  orderForm: FormGroup;
  isOpenEditOrderModal: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cartFacadeService: CartFacadeService,
    private datePipe: DatePipe
  ) {}

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
    this.cartFacadeService.updateOrder(order);
    this.isOpenEditOrderModal = false;
    this.cartFacadeService.notifyUser(
      `${order.product} order quantity updated from ${this.selectedOrder.quantity} to ${order.quantity}.`
    );
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", pathMatch: "full", component: CartComponent },
    ]),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CartComponent],
  providers: [CartFacadeService],
})
export class CartFeatureModule {}
