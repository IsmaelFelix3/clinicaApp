import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BillListService } from '../../bill-list.service';

export interface DialogData {
  id: number;
  pName: string;
  dName: string;
  total: string;
}
@Component({
  selector: 'app-delete:not(d)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public billListService: BillListService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.billListService.deleteBillList(this.data.id);
  }
}
