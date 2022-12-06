import { NgModule } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import "@cds/core/icon/register.js";
import {
  ClarityIcons,
  userIcon,
  storeIcon,
  shoppingCartIcon,
  shoppingBagIcon,
  trashIcon,
  administratorIcon,
  logoutIcon,
  usersIcon,
  fileGroupIcon,
  plusIcon,
  minusIcon,
} from "@cds/core/icon";

@NgModule({
  declarations: [],
  imports: [ClarityModule],
  exports: [ClarityModule],
})
export class MyClarityDesignModule {}

ClarityIcons.addIcons(
  userIcon,
  storeIcon,
  shoppingCartIcon,
  shoppingBagIcon,
  trashIcon,
  administratorIcon,
  logoutIcon,
  usersIcon,
  fileGroupIcon,
  plusIcon,
  minusIcon
);
