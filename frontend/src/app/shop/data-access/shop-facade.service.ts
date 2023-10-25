import { Injectable } from "@angular/core";
import { CustomerStore } from "src/app/stores/customer.store";

@Injectable()
export class ShopFacadeService {
  customer$ = this.customerStore.getAll$();

  constructor(private customerStore: CustomerStore) {
    this.customerStore.init();
  }

  logout = async (): Promise<void> => {
    await this.customerStore.logout();
  };
}
