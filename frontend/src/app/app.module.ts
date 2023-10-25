import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CollapseModule } from "ngx-bootstrap/collapse";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import { KeycloakService, KeycloakAngularModule } from "keycloak-angular";
import { environment } from "src/environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TwoDigitDecimalNumberDirective } from "./directives/two-digit-decimal-number.directive";
import { HttpErrorInterceptor } from "./interceptor/http-error.interceptor";

import { ProductCatalogComponent } from "./components/product-catalog/product-catalog.component";
import { ProductComponent } from "./components/product/product.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { CustomerOrdersComponent } from "./components/customer-orders/customer-orders.component";
import { CartComponent } from "./components/cart/cart.component";
import { CustomerStore } from "./stores/customer.store";
import { AlertComponent } from "./components/alert/alert.component";

export function kcInitializer(
  keycloak: KeycloakService
): () => Promise<boolean> {
  return () => keycloak.init(environment.keycloakOptions);
}

@NgModule({
  declarations: [
    AppComponent,
    ProductCatalogComponent,
    ProductComponent,
    CustomersComponent,
    OrdersComponent,
    TwoDigitDecimalNumberDirective,
    CustomerOrdersComponent,
    CartComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  providers: [
    DatePipe,
    CustomerStore,
    {
      provide: APP_INITIALIZER,
      useFactory: kcInitializer,
      multi: true,
      deps: [KeycloakService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
