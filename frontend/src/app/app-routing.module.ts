import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { CustomersComponent } from './components/customers/customers.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { AppAuthGuard } from './app-auth.guard';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: 'productcatalog', component: ProductCatalogComponent, canActivate: [AppAuthGuard]  },
  { path: 'customers', component: CustomersComponent, canActivate: [AppAuthGuard], data: { roles: ['admin'] } },
  { path: 'orders', component: OrdersComponent, canActivate: [AppAuthGuard], data: { roles: ['admin'] } },
  { path: 'customerorders/:username', component: CustomerOrdersComponent, canActivate: [AppAuthGuard], data: { roles: ['admin'] } },
  { path: 'cart', component: CartComponent, canActivate: [AppAuthGuard] },
  { path: '', redirectTo: '/productcatalog', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
