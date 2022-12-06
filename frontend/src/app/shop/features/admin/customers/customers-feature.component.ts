import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Component, NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { CustomerFacadeService } from "./data-access/customer-facade.service";

@Component({
  selector: "app-customers",
  template: `
    <h3>Customers</h3>
    <clr-datagrid *ngIf="customers$ | async as customers">
      <clr-dg-column>Firstname</clr-dg-column>
      <clr-dg-column>Lastname</clr-dg-column>
      <clr-dg-column>Orders</clr-dg-column>

      <clr-dg-row *clrDgItems="let customer of customers">
        <clr-dg-cell>{{ customer.firstName }}</clr-dg-cell>
        <clr-dg-cell>{{ customer.lastName }}</clr-dg-cell>
        <clr-dg-cell>{{ customer.orders.length }}</clr-dg-cell>

        <ng-container
          ngProjectAs="clr-dg-row-detail"
          *ngIf="customer.orders.length > 0"
        >
          <clr-dg-row-detail *clrIfExpanded>
            <table class="table table-compact">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Order Date</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let order of customer.orders">
                  <td>{{ order.product }}</td>
                  <td>{{ order.productCatalog }}</td>
                  <td>{{ order.orderDate | date: "yyyy-MM-dd" }}</td>
                  <td>{{ order.quantity }}</td>
                  <td>{{ order.unitPrice | number: "1.2-2" }}</td>
                  <td>
                    {{ order.quantity * order.unitPrice | number: "1.2-2" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </clr-dg-row-detail>
        </ng-container>
      </clr-dg-row>

      <clr-dg-footer>{{ customers.length }} Customers</clr-dg-footer>
    </clr-datagrid>
  `,
  styles: [],
})
export class CustomersComponent {
  readonly customers$ = this.customerFacadeService.customersWithOrders$;

  constructor(private customerFacadeService: CustomerFacadeService) {}
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", pathMatch: "full", component: CustomersComponent },
    ]),
    SharedModule,
  ],
  declarations: [CustomersComponent],
  providers: [CustomerFacadeService],
})
export class CustomersFeatureModule {}
