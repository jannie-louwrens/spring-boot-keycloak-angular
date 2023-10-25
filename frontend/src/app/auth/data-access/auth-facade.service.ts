import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { from, map } from "rxjs";
import { UserProfile } from "./user-profile";

@Injectable()
export class AuthFacadeService {
  public readonly userProfile$ = from(
    this.keycloakService.loadUserProfile()
  ).pipe(
    map(
      (userProfile) =>
        ({
          ...userProfile,
          isAdministrator: this.keycloakService.isUserInRole("admin"),
        } as UserProfile)
    )
  );

  constructor(private keycloakService: KeycloakService) {}

  public logout = async (): Promise<void> => {
    await this.keycloakService.logout(location.origin);
  };

  public getLoginUsername(): string {
    return this.keycloakService.getUsername();
  }
}
