import { Order } from "../../orders/data-access/order";
import { KeycloakProfile } from "keycloak-js";

export interface CustomerInfo extends KeycloakProfile {
  orders?: Order[];
  isLoggedIn?: boolean | false;
  isAdministrator?: boolean | false;
}
