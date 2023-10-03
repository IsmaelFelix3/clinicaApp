import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.scss'],
})
export class BookappointmentComponent {
  bookingForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  isDisabled = true;
  constructor(private fb: UntypedFormBuilder) {
    this.bookingForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
      doa: ['', [Validators.required]],
      timeSlot: ['', [Validators.required]],
      injury: [''],
      note: [''],
      uploadFile: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.bookingForm.value);
  }

  get f() {
    return this.bookingForm.controls;
  }
}
