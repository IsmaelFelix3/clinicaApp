import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-add-allotment',
  templateUrl: './add-allotment.component.html',
  styleUrls: ['./add-allotment.component.scss'],
})
export class AddAllotmentComponent {
  roomForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder) {
    this.roomForm = this.fb.group({
      rNo: ['', [Validators.required]],
      rType: ['', [Validators.required]],
      pName: ['', [Validators.required]],
      aDate: ['', [Validators.required]],
      dDate: ['', [Validators.required]],
    });
  }
  onSubmit() {
    console.log('Form Value', this.roomForm.value);
  }
}
