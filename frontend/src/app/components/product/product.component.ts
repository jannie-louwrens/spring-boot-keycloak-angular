import { Component, OnChanges, SimpleChange, Input, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { CartService } from 'src/app/services/cart.service';

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
  isAdministrator: boolean;
  userProfile: KeycloakProfile;

  constructor(
    private productService: ProductService, 
    private orderService: OrderService, 
    private formBuilder: FormBuilder,
    private modalService: BsModalService, 
    private keycloakService: KeycloakService, 
    private cartService: CartService) { }

  async ngOnInit() {
    this.userProfile = await this.keycloakService.loadUserProfile();
    this.isAdministrator = this.keycloakService.isUserInRole("admin");
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
      }, error => {
        console.log(error);
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
        }, (err) => {
          console.log(err);
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
        }, (err) => {
          console.log(err);
        });
  };

  onDeleteProduct(product: Product) {
    product.expirationDate = new Date();
    this.productService.updateProduct(product.id, product)
    .subscribe(res => {
      this.getProductsByProductCatalog(this.productCatalogId);
      this.selectedProduct = {} as Product;
      this.modalRef.hide();
    }, (err) => {
      console.log(err);
    });
  }

  onCreateOrder() {
    // stop here if form is invalid
    if (this.orderForm.invalid) {
      return;
    }
    let order = <Order>this.orderForm.getRawValue();
    this.orderService.createOrder(this.userProfile.username, order)
      .subscribe(order => {
          this.modalRef.hide();
          this.cartService.addItem(order);
        }, (err) => {
          console.log(err);
        });
  };

}
