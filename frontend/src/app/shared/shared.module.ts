import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyClarityDesignModule } from "./modules/my-clarity-design/my-clarity-design.module";
import { registerLocaleData } from "@angular/common";
import localeZA from "@angular/common/locales/en-ZA";

@NgModule({
  declarations: [],
  imports: [CommonModule, MyClarityDesignModule],
  exports: [MyClarityDesignModule],
  providers: [{ provide: LOCALE_ID, useValue: "en-ZA" }],
})
export class SharedModule {}

registerLocaleData(localeZA);
