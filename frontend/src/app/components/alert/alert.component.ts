import { Component } from "@angular/core";

import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-alert",
  template: `<div
    *ngIf="message$ | async as message"
    [ngClass]="message.cssClass"
  >
    {{ message.text }}
  </div>`,
  styles: [],
})
export class AlertComponent {
  message$ = this.alertService.messageAction$;

  constructor(private alertService: AlertService) {}
}
