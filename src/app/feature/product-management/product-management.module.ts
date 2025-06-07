import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from  '@angular/material/select' ;
import {MatInputModule} from  '@angular/material/input' ;
import {MatFormFieldModule} from  '@angular/material/form-field' ;
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CreateProductComponent,
    ListProductComponent,
    EditProductComponent,
    DeleteProductComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ProductManagementModule { }
