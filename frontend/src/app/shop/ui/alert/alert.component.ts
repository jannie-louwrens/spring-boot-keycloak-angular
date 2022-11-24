import { Component, Input } from "@angular/core";

import { AlertService } from "../../data-access/alert.service";
import { Message } from "../../data-access/message";

@Component({
  selector: "app-alert",
  template: `
    <clr-alert
      *ngIf="message"
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
  @Input() message: Message;
}
