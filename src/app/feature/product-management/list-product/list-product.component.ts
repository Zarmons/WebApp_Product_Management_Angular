import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateProduct } from '../shared/models/product-management';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  data: CreateProduct[] = JSON.parse(localStorage.getItem('product') || '[]');

  CreateProductForm!: FormGroup;
  formMode: 'create' | 'edit' = 'create';
  editProductId: string | null = null;

  displayedColumns: string[] = [
    'name',
    'price',
    'category',
    'description',
    'availability',
    'actions',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  columnHeaderMap: { [key: string]: string } = {
    name: 'Nombre',
    price: 'Precio',
    category: 'Categoría',
    description: 'Descripción',
    availability: 'Disponibilidad',
    actions: 'Acciones',
  };

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.CreateProductForm.invalid) return;

    const formValue = this.CreateProductForm.value;

    if (this.formMode === 'edit' && this.editProductId) {
      const index = this.data.findIndex((p) => p.id === this.editProductId);
      if (index !== -1) {
        this.data[index] = { id: this.editProductId, ...formValue };
      }
    } else {
      const newProduct: CreateProduct = {
        id: crypto.randomUUID(),
        ...formValue,
      };
      this.data.push(newProduct);
    }

    localStorage.setItem('product', JSON.stringify(this.data));
    this.CreateProductForm.reset();
    this.formMode = 'create';
    this.editProductId = null;
  }

  onEdit(product: CreateProduct): void {
    this.formMode = 'edit';
    this.editProductId = product.id;

    this.CreateProductForm.setValue({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      availability: product.availability,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onDelete(product: CreateProduct): void {
    const confirmDelete = confirm(
      `¿Estás seguro de eliminar "${product.name}"?`
    );
    if (confirmDelete) {
      this.data = this.data.filter((p) => p.id !== product.id);
      localStorage.setItem('product', JSON.stringify(this.data));
    }
  }
}
