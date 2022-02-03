import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyNgxBootstrapModule } from "./modules/my-ngx-bootstrap/my-ngx-bootstrap.module";
import { MyClarityDesignModule } from "./modules/my-clarity-design/my-clarity-design.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, MyNgxBootstrapModule, MyClarityDesignModule],
  exports: [MyNgxBootstrapModule, MyClarityDesignModule],
})
export class SharedModule {}
