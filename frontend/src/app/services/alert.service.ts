import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router, NavigationStart } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  private messageSubject = new Subject<any>();
  private keepAfterRouteChange = false;

  messageAction$ = this.messageSubject.asObservable();

  constructor(private router: Router) {
    // clear alert message on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single location change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.messageSubject.next({
      text: message,
      cssClass: "success",
    });
  }

  error(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.messageSubject.next({
      text: message,
      cssClass: "danger",
    });
  }

  clear() {
    this.messageSubject.next(undefined);
  }
}
