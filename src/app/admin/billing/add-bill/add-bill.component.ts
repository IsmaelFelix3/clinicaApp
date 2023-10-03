import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss'],
})
export class AddBillComponent {
  billForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder) {
    this.billForm = this.fb.group({
      bNo: ['', [Validators.required]],
      admissionID: ['', [Validators.required]],
      pName: ['', [Validators.required]],
      dName: ['', [Validators.required]],
      aDate: ['', [Validators.required]],
      dDate: ['', [Validators.required]],
      discount: [''],
      total: [''],
      pMethod: ['', [Validators.required]],
      pStatus: ['', [Validators.required]],
    });
  }
  onSubmit() {
    console.log('Form Value', this.billForm.value);
  }
}
