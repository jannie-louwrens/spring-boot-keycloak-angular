import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { StoreFrontFacadeService } from "./../../services/store-front-facade.service";
import { ProductCatalog } from "./../../../models/product-catalog";

@Component({
  selector: "app-store-front",
  templateUrl: "./store-front.component.html",
  styles: [],
})
export class StoreFrontComponent implements OnInit {
  productCatalogList$: Observable<ProductCatalog[]>;

  constructor(private storeFrontFacadeService: StoreFrontFacadeService) {}

  ngOnInit(): void {
    this.productCatalogList$ = this.storeFrontFacadeService.getProductCatalogs$;
  }
}
