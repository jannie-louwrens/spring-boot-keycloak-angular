import { APP_INITIALIZER, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";
import { AuthFacadeService } from "./data-access/auth-facade.service";
import { AppAuthGuard } from "./app-auth.guard";

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
    AuthFacadeService,
    AppAuthGuard,
  ],
})
export class AuthModule {}

function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init(environment.keycloakOptions);
}
