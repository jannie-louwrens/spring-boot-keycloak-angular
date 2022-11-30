import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Component, NgModule } from "@angular/core";
import { OrderFacadeService } from "./data-access/order-facade.service";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-orders",
  template: `
    <h3>Pending Orders</h3>
    <clr-datagrid *ngIf="pendingOrders$ | async as orders">
      <clr-dg-column>Customer</clr-dg-column>
      <clr-dg-column>Product</clr-dg-column>
      <clr-dg-column>Category</clr-dg-column>
      <clr-dg-column>Order Date</clr-dg-column>
      <clr-dg-column>Quantity</clr-dg-column>
      <clr-dg-column>Unit Price</clr-dg-column>
      <clr-dg-column>Total</clr-dg-column>

      <clr-dg-row *ngFor="let order of orders">
        <clr-dg-cell>{{ order.customerName }}</clr-dg-cell>
        <clr-dg-cell>{{ order.product }}</clr-dg-cell>
        <clr-dg-cell>{{ order.productCatalog }}</clr-dg-cell>
        <clr-dg-cell>{{ order.orderDate | date: "yyyy-MM-dd" }}</clr-dg-cell>
        <clr-dg-cell>{{ order.quantity }}</clr-dg-cell>
        <clr-dg-cell>{{ order.unitPrice | number: "1.2-2" }}</clr-dg-cell>
        <clr-dg-cell
          >{{ order.quantity * order.unitPrice | number: "1.2-2" }}</clr-dg-cell
        >
      </clr-dg-row>

      <clr-dg-footer>{{ orders.length }} Orders</clr-dg-footer>
    </clr-datagrid>
  `,
  styles: [],
})
export class OrdersComponent {
  readonly pendingOrders$ = this.orderFacadeService.ordersWithCustomer$;

  constructor(private orderFacadeService: OrderFacadeService) {}
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", pathMatch: "full", component: OrdersComponent },
    ]),
    SharedModule,
  ],
  declarations: [OrdersComponent],
  providers: [OrderFacadeService],
})
export class OrdersFeatureModule {}
