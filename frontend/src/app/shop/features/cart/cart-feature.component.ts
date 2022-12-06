import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Component, NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { CartFacadeService } from "./data-access/cart-facade.service";
import { Order } from "../admin/orders/data-access/order";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: [],
})
export class CartComponent {
  itemsInCart$ = this.cartFacadeService.cartWithCRUD$;

  constructor(private cartFacadeService: CartFacadeService) {}

  onDeleteOrder(order: Order): void {
    console.log(
      "🚀 ~ file: cart-feature.component.ts:20 ~ CartComponent ~ onDeleteOrder ~ method not implemented"
    );
  }

  onDecreaseQuantity(order: Order): void {
    const updatedOrder = { ...order, quantity: --order.quantity };
    this.cartFacadeService.updateItem(updatedOrder);
  }

  onIncreaseQuantity(order: Order): void {
    const updatedOrder = { ...order, quantity: ++order.quantity };
    this.cartFacadeService.updateItem(updatedOrder);
  }

  calcItems(orders: Order[]): number {
    return orders.reduce((tally, order) => tally + order.quantity, 0);
  }

  calcTotal(orders: Order[]): number {
    return orders.reduce(
      (tally, order) => tally + order.quantity * order.unitPrice,
      0
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
  ],
  declarations: [CartComponent],
})
export class CartFeatureModule {}
