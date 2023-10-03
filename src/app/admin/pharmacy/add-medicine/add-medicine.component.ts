import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss'],
})
export class AddMedicineComponent {
  medicineListForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder) {
    this.medicineListForm = this.fb.group({
      m_no: ['', [Validators.required]],
      m_name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      company: ['', [Validators.required]],
      p_date: ['', [Validators.required]],
      price: ['', [Validators.required]],
      e_date: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });
  }
  onSubmit() {
    console.log('Form Value', this.medicineListForm.value);
  }
}
