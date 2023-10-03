import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AmbulanceListService } from '../../ambulance-list.service';

export interface DialogData {
  id: number;
  vehicle_no: string;
  vehicle_name: string;
  driver_name: string;
}

@Component({
  selector: 'app-delete:not(b)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ambulanceListService: AmbulanceListService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.ambulanceListService.deleteAmbulanceList(this.data.id);
  }
}
