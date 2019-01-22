import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { CartService } from './services/cart.service';

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

  userProfile: KeycloakProfile;
  isLoggedIn: boolean;
  isAdministrator: boolean;
  isCollapsed = true;
  total$: Observable<number>;
  
  constructor(
    private router: Router, 
    private keycloakService: KeycloakService, 
    private cartService: CartService) {}

  async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
      this.userProfile = await this.keycloakService.loadUserProfile();
      await this.keycloakService.isLoggedIn().then((value:boolean)=>{this.isLoggedIn = value});
      this.isAdministrator = this.keycloakService.isUserInRole("admin");
      this.cartService.loadItemsForUser(this.userProfile.username);
      this.total$ = this.cartService.total$;
    }
  }
  
  doLogin(): void {
    this.keycloakService.login();
  }

  async doLogout() {
    await this.router.navigate(['/']);
    await this.keycloakService.logout();
  }

}
