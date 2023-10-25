import { Component, OnChanges, SimpleChange, Input, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Order } from '../../models/order';
import { Observable } from 'rxjs';
import { CustomerInfo } from 'src/app/models/customer.info';
import { CustomerStore } from 'src/app/stores/customer.store';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnChanges, OnInit {

  @Input() productCatalogId: string;
  @Input() productCatalogName: string;

  modalRef: BsModalRef;

  products: Product[] = [];
  selectedProduct: Product;
  productForm: FormGroup;
  orderForm: FormGroup;
  customer$: Observable<CustomerInfo>;

  constructor(
    private productService: ProductService, 
    private formBuilder: FormBuilder,
    private modalService: BsModalService, 
    private customerStore: CustomerStore,
    private alertService: AlertService) { 
      this.customerStore.init();
    }

  async ngOnInit() {
    this.customer$ = this.customerStore.getAll$();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes['productCatalogId']) {
      this.getProductsByProductCatalog(this.productCatalogId);
    }
  }

  getProductsByProductCatalog(id: string) {
    this.productService.getEffectiveProductsByProductCatalogOnDate(id, new Date(Date.now()))
      .subscribe(data => {
        this.products = data;
      });
  }

  openAddProductModal(template: TemplateRef<any>) {
    let dp = new DatePipe(navigator.language);
    let p = 'y-MM-dd'; // YYYY-MM-DD
    let dtr = dp.transform(new Date(), p);
    this.productForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.required],
      'unitPrice' : [null, Validators.required],
      'effectiveDate' : [dtr, Validators.required]
    });
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  openDeleteProductModal(template: TemplateRef<any>, product: Product) {
    this.selectedProduct = product;
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  openEditProductModal(template: TemplateRef<any>, product: Product) {
    let dp = new DatePipe(navigator.language);
    let p = 'y-MM-dd'; // YYYY-MM-DD
    let dtr = dp.transform(product.effectiveDate, p);
    this.productForm = this.formBuilder.group({
      'id' : product.id,
      'productCatalogId': product.productCatalogId,
      'name' : [product.name, Validators.required],
      'description' : [product.description, Validators.required],
      'unitPrice' : [product.unitPrice, Validators.required],
      'effectiveDate' : [dtr, Validators.required]
    });
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  openCreateOrderModal(template: TemplateRef<any>, product: Product) {
    let dp = new DatePipe(navigator.language);
    let p = 'y-MM-dd'; // YYYY-MM-DD
    let dtr = dp.transform(new Date(), p);
    this.orderForm = this.formBuilder.group({
      'product' : [{value: product.name, disabled: true}],
      'productCatalog' : [{value: this.productCatalogName, disabled: true}],
      'unitPrice' : [{value: product.unitPrice, disabled: true}],
      'orderDate' : [{value: dtr, disabled: true}],
      'quantity' : [null, Validators.required]
    });
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.productForm.controls; 
  }

  onAddProduct() {
    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }
    let product = <Product>this.productForm.value;
    product.productCatalogId = this.productCatalogId;
    this.productService.createProduct(this.productCatalogId, product)
      .subscribe(res => {
          this.getProductsByProductCatalog(this.productCatalogId);
          this.modalRef.hide();
          this.alertService.success(`Added ${product.name} product.`);
        });
  };

  onUpdateProduct() {
    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }
    let product = <Product>this.productForm.value;
    this.productService.updateProduct(product.id, product)
      .subscribe(res => {
          this.getProductsByProductCatalog(this.productCatalogId);
          this.modalRef.hide();
          this.alertService.success(`Updated ${product.name} product.`);
        });
  };

  onDeleteProduct(product: Product) {
    product.expirationDate = new Date();
    this.productService.updateProduct(product.id, product)
    .subscribe(res => {
      this.getProductsByProductCatalog(this.productCatalogId);
      this.selectedProduct = {} as Product;
      this.modalRef.hide();
      this.alertService.success(`Deleted ${product.name} product.`);
    });
  }

  onCreateOrder() {
    // stop here if form is invalid
    if (this.orderForm.invalid) {
      return;
    }
    let order = <Order>this.orderForm.getRawValue();
    this.customerStore.addOrder(order);
    this.modalRef.hide();
    this.alertService.success(`Order placed for ${order.quantity} ${order.product}.`);
  };

}
