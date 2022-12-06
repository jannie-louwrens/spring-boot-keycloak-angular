import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { BehaviorSubject, from, map, tap } from "rxjs";
import { UserProfile } from "./user-profile";

@Injectable()
export class AuthFacadeService {
  private userProfileSubject = new BehaviorSubject<UserProfile>(null);
  public readonly userProfile$ = this.userProfileSubject.asObservable();

  public readonly loadUserProfile$ = from(
    this.keycloakService.loadUserProfile()
  ).pipe(
    map(
      (userProfile) =>
        ({
          ...userProfile,
          isAdministrator: this.keycloakService.isUserInRole("admin"),
        } as UserProfile)
    ),
    tap((user) => this.userProfileSubject.next(user))
  );

  constructor(private keycloakService: KeycloakService) {}

  public logout = async (): Promise<void> => {
    await this.keycloakService.logout(location.origin);
  };

  public getLoginUsername(): string {
    return this.keycloakService.getUsername();
  }
}
