import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "app-header",
  template: `
    <clr-header class="header-4">
      <div class="branding">
        <a class="nav-link" routerLink="/">
          <span class="title"
            ><cds-icon shape="store" solid size="lg"></cds-icon>Shop</span
          >
        </a>
      </div>

      <div class="header-actions" [style.padding]="'0 1.2rem'">
        <a
          class="nav-link nav-icon"
          routerLink="/cart"
          routerLinkActive="active"
        >
          <cds-icon
            shape="shopping-cart"
            size="lg"
            *ngIf="customerOrderCount === 0"
          ></cds-icon>
          <cds-icon
            shape="shopping-cart"
            badge="danger"
            size="lg"
            *ngIf="customerOrderCount > 0"
          ></cds-icon>
        </a>
      </div>
    </clr-header>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() customerOrderCount: number = 0;

  isCollapsed = true;
}
