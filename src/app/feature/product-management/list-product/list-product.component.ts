import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CreateProduct } from "../shared/models/product-management";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-list-product",
  templateUrl: "./list-product.component.html",
  styleUrls: ["./list-product.component.scss"],
})
export class ListProductComponent implements OnInit {
  @ViewChild("dialogTemplate") dialogTemplate!: TemplateRef<any>;
  @ViewChild("dialogTemplateDelete") dialogTemplateDelete!: TemplateRef<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  dataSource: MatTableDataSource<CreateProduct>;

  CreateProductForm!: FormGroup;
  currentProductId: string | null = null;
  dialogRef!: MatDialogRef<any>;
  productoDelete: any = "";
  availabilityFilter: string = "";
  categoryFilter: string = "";
  data: CreateProduct[] = JSON.parse(localStorage.getItem("product") || "[]");
  displayedColumns: string[] = [
    "name",
    "price",
    "category",
    "description",
    "availability",
    "actions",
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  columnHeaderMap: { [key: string]: string } = {
    name: "Nombre",
    price: "Precio",
    category: "Categoría",
    description: "Descripción",
    availability: "Disponibilidad",
    actions: "Acciones",
  };

  categorias: { value: string; label: string }[] = [
    { value: "muebles", label: "Muebles" },
    { value: "aseo", label: "Aseo" },
    { value: "tecnologia", label: "Tecnología" },
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(this.data);
  }
  ngOnInit(): void {
    this.dataSource.filterPredicate = (data, filter: string) => {
    const filters = JSON.parse(filter);
    let validate = (filters.availability === "true")
      const availabilityFilter =
        filters.availability !== ""
          ? data.availability === String(validate)
          : true;
      const categoryFilter =
        filters.category !== "" ? data.category === filters.category : true;
      return availabilityFilter && categoryFilter;
    };


    this.CreateProductForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      category: new FormControl(""),
      description: new FormControl(""),
      availability: new FormControl(false),
    });
  }

  openDialog(element: any) {
    this.currentProductId = element.id;
    this.CreateProductForm.patchValue({
      name: element.name,
      category: element.category,
      price: element.price,
      description: element.description,
      availability: element.availability,
    });
    this.dialog.open(this.dialogTemplate);
  }

  onSubmit() {
    if (this.CreateProductForm.invalid) return;
    const updatedProduct = this.CreateProductForm.value;
    const index = this.dataSource.data.findIndex(
      (p) => p.id === this.currentProductId
    );
    if (index !== -1) {
      this.dataSource.data[index] = {
        ...this.dataSource.data[index],
        ...updatedProduct,
      };
      this.dataSource._updateChangeSubscription();
    }
    this.dialog.closeAll();
  }

  openDialogValidate(product: CreateProduct) {
    this.dialogRef = this.dialog.open(this.dialogTemplateDelete);
    this.productoDelete = product;
  }

  onDelete(): void {
    this.data = this.data.filter((p) => p.id !== this.productoDelete.id);
    localStorage.setItem("product", JSON.stringify(this.data));
    this.dataSource.data = this.data;
    this._snackBar.open("El producto fue eliminado con éxito", "", {
      duration: 3000,
    });
    this.dialogRef.close();
  }

  applyFilter() {
    const filterValues = {
      availability: this.availabilityFilter,
      category: this.categoryFilter,
    };
    this.dataSource.filter = JSON.stringify(filterValues);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
