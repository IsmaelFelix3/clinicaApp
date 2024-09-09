import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CalendarService } from '../../calendar.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormGroup,
} from '@angular/forms';
import { Calendar } from '../../calendar.model';
import { DoctorsService } from 'app/admin/doctors/alldoctors/doctors.service';
import { Medico } from 'app/interfaces/Medico.interface';
import { QuirofanosService } from '../../../services/quirofanos.service';
import { Paciente } from 'app/interfaces/Paciente.interface';
import { PatientsService } from 'app/doctor/patients.service';
import { ProcedimientoEdit, Quirofano } from 'app/interfaces/Procedimiento';
import { ProceduresCatalogService } from 'app/services/procedures-catalog.service';
import { ProcedimientoCatalogo } from 'app/interfaces/CatalogoProcedimientos';
import { CliqProceduresService } from 'app/services/cliq-procedures.service';
import Swal from 'sweetalert2';
import { ProcedimientoPostReturn } from '../../../interfaces/Procedimiento';

export interface DialogData {
  id: number;
  action: string;
  calendar: ProcedimientoEdit;
}

@Component({
  selector: 'app-form-dialog:not(o)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  providers: [DoctorsService, PatientsService]
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  calendarForm: FormGroup;
  calendar: Calendar;
  doctors: Medico[] = [];
  patients: Paciente[] = [];
  operatingRooms: Quirofano[] = [];
  proceduresCatalog: ProcedimientoCatalogo[] = [];
  showSaveBtn = true;
  showDeleteBtn = false;
  showEditBtn = false;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public calendarService: CalendarService,
    private fb: UntypedFormBuilder,
    public doctorService: DoctorsService,
    public patientService: PatientsService,
    public operatingRoomService: QuirofanosService,
    public proceduresCatalogService: ProceduresCatalogService,
    public cliqProcedureService: CliqProceduresService
  ) {
    
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.calendar.operatingRoomName + ' ' + data.calendar.doctorName;
      this.calendar = {
        idBooking: data.calendar.idBooking,
        doctor: data.calendar.doctorId,
        patient: data.calendar.patientId,
        operatingRoom: data.calendar.operatingRoomId,
        startDate: data.calendar.startDate,
        endDate: data.calendar.endDate,
        procedure: data.calendar.procedureId,
        status: data.calendar.status,
        details: data.calendar.details,
      };
      this.showSaveBtn = false;
      this.showDeleteBtn = true;
      this.showEditBtn = true
    } else {
      this.dialogTitle = 'Nueva Reserva';
      const blankObject = {} as Calendar;
      this.calendar = new Calendar(blankObject);
      this.calendar.startDate = data.calendar.startDate;
      this.calendar.endDate = data.calendar.endDate;
      this.showDeleteBtn = false;
    }
    this.calendarForm = this.createContactForm();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.doctorService.getAllDoctorss().subscribe( doctors => this.doctors = doctors.medicos );
    this.operatingRoomService.getQuirofanos().subscribe( operatingRooms => this.operatingRooms = operatingRooms.quirofanos.rows );
    if(this.data.action === 'edit'){
      this.patientService.getAllPatients(this.calendar.doctor).subscribe( patients => this.patients = patients.paciente );
      this.proceduresCatalogService.getAllPatients(this.calendar.operatingRoom).subscribe( prodecures => this.proceduresCatalog = prodecures.catalogoProcedimiento.rows );
    }
  }

  getPatients(){
    const doctor = this.calendarForm.value.doctor;
    this.patientService.getAllPatients(doctor).subscribe( patients => {
      this.patients = patients.paciente;
    });
  }

  getProceduresByOperatingRoom(){
    const operatingRoomId = this.calendarForm.value.operatingRoom;
    this.proceduresCatalogService.getAllPatients(operatingRoomId).subscribe( prodecures => this.proceduresCatalog = prodecures.catalogoProcedimiento.rows )
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      patient: [this.calendar.patient, [Validators.required]],
      doctor: [this.calendar.doctor, [Validators.required]],
      procedure: [this.calendar.procedure, [Validators.required]],
      operatingRoom: [this.calendar.operatingRoom, [Validators.required]],
      startDate: [this.calendar.startDate, [Validators.required]],
      endDate: [this.calendar.endDate, [Validators.required]],
      status: [this.calendar.status, [Validators.required]],
      details: [ this.calendar.details, [ Validators.required]]
    });
  }

  submit() {
    // emppty stuff
  }

  deleteEvent() {
    // this.calendarService.deleteCalendar(this.calendarForm.getRawValue());
    this.cliqProcedureService.deleteProcedure(this.calendar.idBooking).subscribe({
      complete: () => {
        this.calendarForm.reset();      
        // Swal.fire('Se agendo procedimiento con exito');
      },
      error: (data) => {
        Swal.fire({icon: 'error',title:'Error al registrar procedimiento', text: data.msg});
      },
    });
    this.dialogRef.close('delete');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const form = this.calendarForm.getRawValue();
    const actualDate = new Date();
    const start = new Date(form.startDate);
    const end = new Date (form.endDate);

    if( start >= end ){
      Swal.fire({icon: 'error',title:'Error al editar el procedimiento', text: 'Fecha inicio debe ser menor a fecha fin'});
    }
    if(start < actualDate){
      Swal.fire({icon: 'error',title:'Error al editar el procedimiento', text: 'Fecha inicio debe ser mayor la fecha actual'});
    }

    this.cliqProcedureService.scheduleProcedure(this.calendarForm.getRawValue()).subscribe({
      complete: () => {
        this.calendarForm.reset();      
        Swal.fire('Se agendo procedimiento con exito');
      },
      error: (data) => {
        Swal.fire({icon: 'error',title:'Error al registrar procedimiento', text: data.msg});
      },
    });

    // this.calendarService.addUpdateCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close('submit');
  }

  public editEvent(): void {

    const original = this.calendar;
    const form = this.calendarForm.getRawValue();
    if(original.doctor == form.doctor && original.patient == form.patient && original.details == form.details && original.endDate == form.endDate &&
       original.startDate == form.startDate && original.operatingRoom == form.operatingRoom && original.procedure == form.procedure && original.status == form.status){
        Swal.fire({icon: 'info', text: 'No se han registrado cambios'});
        return;
      }

    const actualDate = new Date();
    const start = new Date(form.startDate);
    const end = new Date (form.endDate);

    if( start >= end ){
      Swal.fire({icon: 'error',title:'Error al editar el procedimiento', text: 'Fecha inicio debe ser menor a fecha fin'});
    }
    if(start < actualDate){
      Swal.fire({icon: 'error',title:'Error al editar el procedimiento', text: 'Fecha inicio debe ser mayor la fecha actual'});
    }

    this.cliqProcedureService.editProcedure(this.calendarForm.getRawValue(), original.idBooking).subscribe({
      complete: () => {
        this.calendarForm.reset();      
        Swal.fire('Se edito el procedimiento con exito');
      },
      error: (data) => {
        Swal.fire({icon: 'error',title:'Error al registrar procedimiento', text: data.msg});
      },
    });

    // this.calendarService.addUpdateCalendar(this.calendarForm.getRawValue());
    this.dialogRef.close('submit');
  }

  campoEsValido(campo: string){
    return this.calendarForm.controls[campo].errors && this.calendarForm.controls[campo].touched;
  }
}
