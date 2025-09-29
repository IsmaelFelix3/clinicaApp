import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
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
import { Especialidad } from 'app/interfaces/Especialidad';
import { SpecialtiesService } from 'app/services/specialties.service';

export interface DialogData {
  id: number;
  action: string;
  calendar: ProcedimientoEdit;
  isDoctor: boolean;
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
  specialties: Especialidad[] = [];
  proceduresCatalog: ProcedimientoCatalogo[] = [];
  showSaveBtn = true;
  showDeleteBtn = false;
  showEditBtn = false;
  showButtons = true;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public calendarService: CalendarService,
    private fb: UntypedFormBuilder,
    public doctorService: DoctorsService,
    public patientService: PatientsService,
    public operatingRoomService: QuirofanosService,
    public proceduresCatalogService: ProceduresCatalogService,
    public cliqProcedureService: CliqProceduresService,
    public specialtiesService: SpecialtiesService,
    private cd: ChangeDetectorRef
  ) {

    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.calendar.operatingRoomName + ' ' + data.calendar.doctorName;
      this.calendar = {
        serie: data.calendar.serie,
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
      this.dialogTitle = 'Registrar Procedimiento';
      const blankObject = {} as Calendar;
      this.calendar = new Calendar(blankObject);
      this.calendar.startDate = data.calendar.startDate;
      this.calendar.endDate = data.calendar.endDate;
      this.showDeleteBtn = false;
    }
    this.calendarForm = this.createContactForm();
    if(data.isDoctor === true){
      this.showButtons = false;
      this.calendarForm.disable();
    }

  }

  ngOnInit(): void {

    this.doctorService.getAllDoctorss().subscribe( doctors => this.doctors = doctors.medicos );
    this.operatingRoomService.getQuirofanos().subscribe( operatingRooms => this.operatingRooms = operatingRooms.quirofanos.rows );
    this.specialtiesService.getSpecialties().subscribe( specialties => this.specialties =  specialties.specialties.rows );
    if(this.data.action === 'edit'){
      this.patientService.getAllPatients(this.calendar.doctor).subscribe( patients => this.patients = patients.paciente );
      this.proceduresCatalogService.getProcedureConfigurationDetails(this.calendar.procedure).subscribe( procedure => {
        let idSpecialty = parseInt(procedure.detallesProcedimiento.especialidad);
        this.calendarForm.get('specialty')?.setValue(idSpecialty)
        this.proceduresCatalogService.getProceduresBySpecialtyId(idSpecialty).subscribe( procedures =>  {
          this.proceduresCatalog =  procedures.catalogoProcedimiento.rows
        });
      });
    }
  }

  getPatients(){
    const doctor = this.calendarForm.value.doctor;
    this.patientService.getAllPatients(doctor).subscribe( patients => {
      this.patients = patients.paciente;
    });
  }

  getProceduresBySpecialtyId(){
    const specialtyId = this.calendarForm.value.specialty;
    this.proceduresCatalogService.getProceduresBySpecialtyId(specialtyId).subscribe( prodecures => this.proceduresCatalog = prodecures.catalogoProcedimiento.rows )
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      serie: [this.calendar.serie, [Validators.required,Validators.pattern(/^PC-PRM[0-9]+$/i)]],
      patient: [this.calendar.patient, [Validators.required]],
      doctor: [this.calendar.doctor, [Validators.required]],
      procedure: [this.calendar.procedure, [Validators.required]],
      operatingRoom: [this.calendar.operatingRoom, [Validators.required]],
      startDate: [this.calendar.startDate, [Validators.required]],
      endDate: [this.calendar.endDate, [Validators.required]],
      status: [this.calendar.status, [Validators.required]],
      details: [ this.calendar.details, []],
      specialty: [, [Validators.required]]
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
    console.log(this.calendarForm.getRawValue())
    const form = this.calendarForm.getRawValue();
    const actualDate = new Date(new Date().toUTCString()).getTime();

    const start = new Date(form.startDate).toUTCString();
    const end = new Date(form.endDate).toUTCString();


    const startToCompare = new Date(start).getTime();
    const endToCompare = new Date(end).getTime();

    if( startToCompare >= endToCompare ){
      Swal.fire({icon: 'error',title:'Error al editar el procedimiento', text: 'Fecha inicio debe ser menor a fecha fin'});
      return;
    }
    /*if(startToCompare < actualDate){
      Swal.fire({icon: 'error',title:'Error al editar el procedimiento', text: 'Fecha inicio debe ser mayor la fecha actual'});
      return;
    }*/
    this.calendarForm.get('serie')?.setValue(this.calendarForm.value.serie.toUpperCase());
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
    if(original.serie == form.serie && original.doctor == form.doctor && original.patient == form.patient && original.details == form.details && original.endDate == form.endDate &&
       original.startDate == form.startDate && original.operatingRoom == form.operatingRoom && original.procedure == form.procedure && original.status == form.status){
        Swal.fire({icon: 'info', text: 'No se han registrado cambios'});
        return;
      }

    const actualDate = new Date(new Date().toUTCString()).getTime();

    const start = new Date(form.startDate).toUTCString();
    const end = new Date(form.endDate).toUTCString();


    const startToCompare = new Date(start).getTime();
    const endToCompare = new Date(end).getTime();

    if( startToCompare >= endToCompare ){
      Swal.fire({icon: 'error',title:'Error al editar el procedimiento', text: 'Fecha inicio debe ser menor a fecha fin'});
      return;
    }
    /*if(startToCompare < actualDate){
      Swal.fire({icon: 'error',title:'Error al editar el procedimiento', text: 'Fecha inicio debe ser mayor la fecha actual'});
      return;
    }*/
    this.calendarForm.get('serie')?.setValue(this.calendarForm.value.serie.toUpperCase());
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
