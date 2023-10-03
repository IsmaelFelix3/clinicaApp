import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Appointments } from '../appointments.model';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

export interface DialogData {
  id: number;
  action: string;
  appointments: Appointments;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  action: string;
  dialogTitle?: string;
  isDetails = false;
  appointmentsForm?: UntypedFormGroup;
  appointments!: Appointments;
  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public appointmentsService: AppointmentsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'details') {
      this.appointments = data.appointments;
      this.isDetails = true;
    } else {
      this.isDetails = false;
      this.dialogTitle = 'New Appointments';
      const blankObject = {} as Appointments;
      // this.appointments = new Appointments(blankObject);
      this.appointmentsForm = this.createContactForm();
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.appointmentsService.currentAppointment = this.appointments;
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
  navigateToAppointment(){
    this.router.navigateByUrl('doctor/appointment');
    this.dialogRef.close();
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.appointments.id_cita],
      img: [this.appointments.Paciente.nombre],
      name: [this.appointments.Paciente.nombre],
      email: [
        this.appointments.Paciente.correo,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dateTime: [
        formatDate(this.appointments.fecha_cita, 'yyyy-MM-dd, HH:mm', 'en'),
        [Validators.required],
      ],
      address: [this.appointments.Paciente.calle_y_numero],
      mobile: [this.appointments.Paciente.telefono],
      disease: [this.appointments.motivo_consulta],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.appointmentsService.addAppointments(
      this.appointmentsForm?.getRawValue()
    );
  }
}
