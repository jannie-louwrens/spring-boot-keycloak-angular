import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyNgxBootstrapModule } from "./modules/my-ngx-bootstrap/my-ngx-bootstrap.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, MyNgxBootstrapModule],
  exports: [MyNgxBootstrapModule],
})
export class SharedModule {}
