import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

    this.CreateProductForm = new FormGroup <CreateProduct>({
      name: new FormControl('', {nonNullable: true}),
      price:new FormControl(0, {nonNullable: true}),
      category:new FormControl('', {nonNullable: true}),
      description:new FormControl('', {nonNullable: true}),
      availability: new FormControl('', {nonNullable: true}),
    });

  }

  createDrug() {
    // this.messageService.add({ severity: 'success', summary: 'Agregado', detail: 'El medicamento fue agregado con éxito' });
    // this.displayCreate = false;
    // this.displayValidateCreate = false;
    this.data = this.CreateProductForm.value;
    // this.DispensaryForm.value.expiration = new Date().toLocaleDateString(this.DispensaryForm.value.expiration);
    // this.DispensaryForm.value.manufacture = new Date().toLocaleDateString(this.DispensaryForm.value.manufacture);
    this.createProduct.push(this.data);
    localStorage.setItem("product",JSON.stringify(this.createProduct));
    this.CreateProductForm.reset();
  }
}
