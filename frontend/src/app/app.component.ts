import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerInfo } from './models/customer.info';
import { CustomerStore } from './stores/customer.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .count {
      padding: 2px 3px;
      z-index:15;
      position:relative;
      left: -10px;
      top:-10px
    }
  `]
})
export class AppComponent implements OnInit {

  isCollapsed = true;
  customer$: Observable<CustomerInfo>;

  constructor(
    private router: Router,
    private customerStore: CustomerStore) {
      this.customerStore.init();
    }

  ngOnInit() {
    this.customer$ = this.customerStore.getAll$();
  }

  doLogin(): void {
    this.customerStore.login();
  }


  async doLogout() {
    await this.router.navigate(['/']);
    await this.customerStore.logout();
  }

}
