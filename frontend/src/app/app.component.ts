import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <clr-main-container>
      <app-alert></app-alert>
      <app-header></app-header>

      <router-outlet></router-outlet>
    </clr-main-container>
  `,
  styles: [],
})
export class AppComponent {}
