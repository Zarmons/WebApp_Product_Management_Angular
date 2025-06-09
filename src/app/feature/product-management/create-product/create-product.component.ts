import { Component, inject, TemplateRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreateProduct } from "../shared/models/product-management";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"],
})
export class CreateProductComponent {
  @ViewChild("dialogTemplate") dialogTemplate!: TemplateRef<any>;
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  createProduct: CreateProduct[] = [];
  CreateProductForm!: FormGroup;
  data: any = "";
  dialogRef: any;

  categorias: { value: string; label: string }[] = [
    { value: "muebles", label: "Muebles" },
    { value: "aseo", label: "Aseo" },
    { value: "tecnologia", label: "Tecnología" },
  ];

  ngOnInit() {
    this.CreateProductForm = new FormGroup({
      id: new FormControl("", { nonNullable: true }),
      name: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required],
      }),
      price: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0.1)],
      }),
      category: new FormControl("", { nonNullable: true }),
      description: new FormControl("", { nonNullable: true }),
      availability: new FormControl(true),
    });
    const storedProducts = localStorage.getItem("product");
    this.createProduct = storedProducts ? JSON.parse(storedProducts) : [];
  }

  openDialog() {
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  createProducts() {
    const lastId = parseInt(localStorage.getItem("lastId") ?? "0");
    const newId = lastId + 1;
    const newProduct = {
      ...this.CreateProductForm.value,
      id: newId,
    };
    this.dialogRef.close();
    this._snackBar.open("El producto fue creado con éxito", "", {
      duration: 3000,
    });
    this.createProduct.push(newProduct);
    localStorage.setItem("product", JSON.stringify(this.createProduct));
    localStorage.setItem("lastId", newId.toString());
    this.CreateProductForm.reset();
  }
}
