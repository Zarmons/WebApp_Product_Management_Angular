import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateProduct } from '../shared/models/product-management';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

  createProduct: CreateProduct[] = [];
  CreateProductForm!: FormGroup;
  data: any = "";

  ngOnInit() {
    this.CreateProductForm = new FormGroup({
      id: new FormControl('', { nonNullable: true }),
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      price: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0.1)],
      }),
      category: new FormControl('', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true }),
      availability: new FormControl('', { nonNullable: true }),
    });
  }

  createProducts() {
    const lastId = parseInt(localStorage.getItem("lastId") ?? "0");
    const newId = lastId + 1;
    this.CreateProductForm.value.id = newId;
    this.data = this.CreateProductForm.value;
    this.createProduct.push(this.data);
    localStorage.setItem("product", JSON.stringify(this.createProduct));
    localStorage.setItem("lastId", newId.toString());
    this.CreateProductForm.reset();
  }
  
}
