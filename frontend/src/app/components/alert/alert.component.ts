import { Component } from "@angular/core";

import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styles: [],
})
export class AlertComponent {
  message$ = this.alertService.messageAction$;

  constructor(private alertService: AlertService) {}
}
