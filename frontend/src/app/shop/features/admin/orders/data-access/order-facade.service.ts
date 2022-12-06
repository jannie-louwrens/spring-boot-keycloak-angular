import { NgModule } from "@angular/core";
import { combineLatest, map, tap } from "rxjs";
import { OrderService } from "./order.service";
import { CustomerService } from "../../customers/data-access/customer.service";
import { Order } from "./order";

@NgModule()
export class OrderFacadeService {
  public readonly orders$ = this.orderService.orders$;
  public readonly customers$ = this.customerService.customers$;

  public ordersWithCustomer$ = combineLatest([
    this.orders$,
    this.customers$,
  ]).pipe(
    map(([orders, customers]) =>
      orders.map(
        (order) =>
          ({
            ...order,
            customerName:
              customers.find((c) => order.customerId === c.username)
                ?.firstName +
              " " +
              customers.find((c) => order.customerId === c.username)?.lastName,
          } as Order)
      )
    ),
    tap((orders) =>
      orders.sort(
        (a, b) =>
          new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
      )
    )
  );

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService
  ) {}
}
