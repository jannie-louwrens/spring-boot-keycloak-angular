import { KeycloakProfile } from "keycloak-js";

export interface UserProfile extends KeycloakProfile {
  isAdministrator?: boolean | false;
}
