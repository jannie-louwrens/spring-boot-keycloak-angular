import { APP_INITIALIZER, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [],
  imports: [CommonModule, KeycloakAngularModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
})
export class AuthModule {}

function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init(environment.keycloakOptions);
}
