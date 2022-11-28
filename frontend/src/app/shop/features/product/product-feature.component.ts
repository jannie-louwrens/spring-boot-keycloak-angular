import {
  Component,
  OnChanges,
  SimpleChange,
  Input,
  OnInit,
  NgModule,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommonModule, DatePipe } from "@angular/common";

import { ProductService } from "./data-access/product.service";
import { Product } from "./data-access/product";
import { Order } from "../orders/data-access/order";
import { Observable } from "rxjs";
import { CustomerInfo } from "../customers/data-access/customer.info";
import { CustomerStore } from "src/app/stores/customer.store";
import { AlertService } from "../../data-access/alert.service";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styles: [],
  providers: [ProductService, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnChanges, OnInit {
  @Input() productCatalogId: string;
  @Input() productCatalogName: string;

  products: Product[] = [];
  selectedProduct: Product;
  productForm: FormGroup;
  orderForm: FormGroup;
  customer$: Observable<CustomerInfo>;
  isOpenAddProductModal: boolean = false;
  isOpenUpdateProductModal: boolean = false;
  isOpenDeleteProductModal: boolean = false;
  isOpenCreateOrderModal: boolean = false;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private customerStore: CustomerStore,
    private alertService: AlertService,
    private datePipe: DatePipe
  ) {
    this.customerStore.init();
  }

  async ngOnInit() {
    this.customer$ = this.customerStore.getAll$();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes["productCatalogId"]) {
      this.getProductsByProductCatalog(this.productCatalogId);
    }
  }

  getProductsByProductCatalog(id: string) {
    this.productService
      .getEffectiveProductsByProductCatalogOnDate(id, new Date(Date.now()))
      .subscribe((data) => {
        this.products = data;
      });
  }

  openAddProductModal() {
    let dtr = this.datePipe.transform(new Date(), "y-MM-dd");
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      unitPrice: [null, Validators.required],
      effectiveDate: [dtr, Validators.required],
    });
    this.isOpenAddProductModal = true;
  }

  openDeleteProductModal(product: Product) {
    this.selectedProduct = product;
    this.isOpenDeleteProductModal = true;
  }

  openEditProductModal(product: Product) {
    let dtr = this.datePipe.transform(new Date(), "y-MM-dd");
    this.productForm = this.formBuilder.group({
      id: product.id,
      productCatalogId: product.productCatalogId,
      name: [product.name, Validators.required],
      description: [product.description, Validators.required],
      unitPrice: [product.unitPrice, Validators.required],
      effectiveDate: [dtr, Validators.required],
    });
    this.isOpenUpdateProductModal = true;
  }

  openCreateOrderModal(product: Product) {
    let dtr = this.datePipe.transform(new Date(), "y-MM-dd");
    this.orderForm = this.formBuilder.group({
      product: [{ value: product.name, disabled: true }],
      productCatalog: [{ value: this.productCatalogName, disabled: true }],
      unitPrice: [{ value: product.unitPrice, disabled: true }],
      orderDate: [{ value: dtr, disabled: true }],
      quantity: [null, Validators.required],
      total: [null],
    });
    this.isOpenCreateOrderModal = true;
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
    let dtr = this.datePipe.transform(product.effectiveDate, "y-MM-dd");
    product.effectiveDate = new Date(dtr);
    this.productService
      .createProduct(this.productCatalogId, product)
      .subscribe((res) => {
        this.getProductsByProductCatalog(this.productCatalogId);
        this.isOpenAddProductModal = false;
        this.alertService.success(`Added ${product.name} product.`);
      });
  }

  onUpdateProduct() {
    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }
    let product = <Product>this.productForm.value;
    let dtr = this.datePipe.transform(product.effectiveDate, "y-MM-dd");
    product.effectiveDate = new Date(dtr);
    this.productService.updateProduct(product.id, product).subscribe((res) => {
      this.getProductsByProductCatalog(this.productCatalogId);
      this.isOpenUpdateProductModal = false;
      this.alertService.success(`Updated ${product.name} product.`);
    });
  }

  onDeleteProduct(product: Product) {
    product.expirationDate = new Date();
    this.productService.updateProduct(product.id, product).subscribe((res) => {
      this.getProductsByProductCatalog(this.productCatalogId);
      this.selectedProduct = {} as Product;
      this.isOpenDeleteProductModal = false;
      this.alertService.success(`Deleted ${product.name} product.`);
    });
  }

  onCreateOrder() {
    // stop here if form is invalid
    if (this.orderForm.invalid) {
      return;
    }
    let order = <Order>this.orderForm.getRawValue();
    let dtr = this.datePipe.transform(order.orderDate, "y-MM-dd");
    order.orderDate = new Date(dtr);
    this.customerStore.addOrder(order);
    this.isOpenCreateOrderModal = false;
    this.alertService.success(
      `Order placed for ${order.quantity} ${order.product}.`
    );
  }
}

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ProductComponent],
  exports: [ProductComponent],
  providers: [CustomerStore],
})
export class ProductFeatureModule {}
