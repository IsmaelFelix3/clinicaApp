import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BillListService } from '../../bill-list.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { BillList } from '../../bill-list.model';

export interface DialogData {
  id: number;
  action: string;
  billList: BillList;
}

@Component({
  selector: 'app-form-dialog:not(d)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  billListForm: UntypedFormGroup;
  billList: BillList;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public billListService: BillListService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.billList.pName;
      this.billList = data.billList;
    } else {
      this.dialogTitle = 'New BillList';
      const blankObject = {} as BillList;
      this.billList = new BillList(blankObject);
    }
    this.billListForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.billList.id],
      img: [this.billList.img],
      pName: [this.billList.pName],
      admissionID: [this.billList.admissionID],
      dName: [this.billList.dName],
      status: [this.billList.status],
      date: [this.billList.date],
      tax: [this.billList.tax],
      discount: [this.billList.discount],
      total: [this.billList.total],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.billListService.addBillList(this.billListForm.getRawValue());
  }
}
