import { NgModule } from "@angular/core";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

@NgModule({
  declarations: [],
  imports: [
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  exports: [CollapseModule, TooltipModule, ModalModule, BsDropdownModule],
})
export class MyNgxBootstrapModule {}
