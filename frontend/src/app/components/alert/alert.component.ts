import { Component } from "@angular/core";

import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-alert",
  template: `
    <clr-alert
      *ngIf="message$ | async as message"
      [clrAlertType]="message.cssClass"
      [clrAlertAppLevel]="true"
      [clrAlertClosable]="false"
    >
      <clr-alert-item
        ><span>{{ message.text }}</span></clr-alert-item
      >
    </clr-alert>
  `,
  styles: [],
})
export class AlertComponent {
  message$ = this.alertService.messageAction$;

  constructor(private alertService: AlertService) {}
}
