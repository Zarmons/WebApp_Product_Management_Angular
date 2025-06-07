import { FormControl } from '@angular/forms';

export interface CreateProduct {
  name: FormControl<string>,
  price: FormControl<number>,
  category: FormControl<string>,
  description: FormControl<string>,
  availability: FormControl<string>,
}



