import { NgModule } from "@angular/core";
import { forkJoin, map, mergeMap, tap } from "rxjs";
import { OrderService } from "../../orders/data-access/order.service";
import { CustomerInfo } from "./customer.info";
import { CustomerService } from "./customer.service";

@NgModule()
export class CustomerFacadeService {
  public readonly orders$ = this.orderService.orders$;
  public readonly customers$ = this.customerService.customers$;

  public customersWithOrders$ = this.customers$.pipe(
    mergeMap((customers) =>
      forkJoin(
        customers.map((customer) =>
          this.orders$.pipe(
            map((orders) =>
              orders.filter((order) => order.customerId === customer.username)
            ),
            map(
              (orders) =>
                ({
                  ...customer,
                  orders,
                } as CustomerInfo)
            )
          )
        )
      )
    ),
    tap((customers) =>
      customers.sort((a, b) => a.lastName.localeCompare(b.lastName))
    )
  );

  constructor(
    private customerService: CustomerService,
    private orderService: OrderService
  ) {}
}
