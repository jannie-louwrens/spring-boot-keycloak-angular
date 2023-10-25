import { Injectable } from "@angular/core";
import { switchMap, tap } from "rxjs";
import { AuthFacadeService } from "src/app/auth/data-access/auth-facade.service";
import { OrderService } from "../features/orders/data-access/order.service";
import { AlertService } from "./alert.service";

@Injectable()
export class ShopFacadeService {
  public readonly notificationMessage$ = this.alertService.message$;
  public readonly userProfile$ = this.authFacadeService.userProfile$.pipe(
    tap((userProfile) =>
      this.orderService.changeSelectedCustomerId(userProfile.username)
    )
  );
  public readonly customerOrderCount$ =
    this.orderService.ordersByCustomer$.pipe(
      switchMap(async (orders) => orders.length)
    );

  constructor(
    private alertService: AlertService,
    private orderService: OrderService,
    private authFacadeService: AuthFacadeService
  ) {}

  logout = async (): Promise<void> => {
    await this.authFacadeService.logout();
  };
}
