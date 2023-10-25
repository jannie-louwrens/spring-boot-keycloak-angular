import { Injectable } from "@angular/core";
import { AlertService } from "src/app/shop/data-access/alert.service";
import { Order } from "../../orders/data-access/order";
import { OrderService } from "../../orders/data-access/order.service";

@Injectable()
export class CartFacadeService {
  public readonly ordersByCustomer$ = this.orderService.ordersByCustomer$;

  constructor(
    private alertService: AlertService,
    private orderService: OrderService
  ) {}

  public notifyUser(message: string): void {
    this.alertService.success(message);
  }

  public updateOrder(order: Order): void {
    this.orderService.updateOrder(order.id, order).subscribe();
  }
}
