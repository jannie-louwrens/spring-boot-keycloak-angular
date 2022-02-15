import { Injectable } from "@angular/core";
import { ProductCatalogService } from "src/app/services/product-catalog.service";

@Injectable()
export class StoreFrontFacadeService {
  constructor(private productCatalogService: ProductCatalogService) {}

  getProductCatalogs$ = this.productCatalogService.getProductCatalogs();
}
