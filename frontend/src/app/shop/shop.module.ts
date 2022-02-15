import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { ShopRoutingModule } from "./shop-routing.module";
import { SharedModule } from "../shared/shared.module";
import { CartComponent } from "./components/cart/cart.component";
import { CustomerOrdersComponent } from "./components/customer-orders/customer-orders.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { ProductCatalogComponent } from "./components/product-catalog/product-catalog.component";
import { ProductComponent } from "./components/product/product.component";
import { TwoDigitDecimalNumberDirective } from "./directives/two-digit-decimal-number.directive";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomerStore } from "../stores/customer.store";
import { StoreFrontComponent } from "./components/store-front/store-front.component";
import { StoreFrontFacadeService } from "./services/store-front-facade.service";

@NgModule({
  declarations: [
    ProductCatalogComponent,
    ProductComponent,
    CustomersComponent,
    OrdersComponent,
    TwoDigitDecimalNumberDirective,
    CustomerOrdersComponent,
    CartComponent,
    StoreFrontComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe, CustomerStore, StoreFrontFacadeService],
  exports: [ShopRoutingModule],
})
export class ShopModule {}
