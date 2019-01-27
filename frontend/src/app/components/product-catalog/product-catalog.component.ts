import { Component, OnInit } from '@angular/core';

import { ProductCatalogService } from '../../services/product-catalog.service';
import { ProductCatalog } from '../../models/product-catalog';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styles: []
})
export class ProductCatalogComponent implements OnInit {

  selectedProductCatalog: ProductCatalog;
  productCatalogs: ProductCatalog[] = [];

  constructor(private productCatalogService: ProductCatalogService) { }

  ngOnInit() {
    this.productCatalogService.getProductCatalogs()
      .subscribe(data => {
        this.productCatalogs = data;
      });
  }

  changeProductCatalog(productCatalog: ProductCatalog) {
    this.selectedProductCatalog = productCatalog;
  }
}
