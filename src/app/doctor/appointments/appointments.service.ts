import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointments } from './appointments.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { NuevaCita } from 'app/interfaces/Cita.interface';
@Injectable()
export class AppointmentsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/doc-appointments.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Appointments[]> = new BehaviorSubject<
    Appointments[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData!: Appointments;
  currentAppointment: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Appointments[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  // getAllAppointmentss(): void {
  getAllAppointmentss(idMedico: number){

    // this.httpClient.get('http://localhost:8000/api/citas').subscribe( data =>{
    //   console.log(data);
    // });
    // this.subs.sink = this.httpClient.get<Appointments[]>('http://localhost:8000/api/citas').subscribe({
    //   next: (data) => {
    //     this.isTblLoading = false;
    //     this.dataChange.next(data);
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.isTblLoading = false;
    //     console.log(error.name + ' ' + error.message);
    //   },
    // });
    return this.httpClient.get<Appointments[]>(`http://localhost:8000/api/citas/${idMedico}`);
  }

  getTakenSlots(selectedDate: string){
    return this.httpClient.get(`http://localhost:8000/api/citas/takenSlots/${selectedDate}`);
  }
  addAppointments(appointments: Appointments): void {
    this.dialogData = appointments;

    // this.httpClient.post(this.API_URL, appointments)
    //   .subscribe({
    //     next: (data) => {
    //       this.dialogData = appointments;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //        // error code here
    //     },
    //   });
  }

  getLastAppoinment(idPaciente: number){
    return this.httpClient.get(`http://localhost:8000/api/citas/lastAppoinment/${idPaciente}`);
  }

  addAppoinment(newAppoinment: NuevaCita){
    return this.httpClient.post(`http://localhost:8000/api/citas/`, newAppoinment);
  }
  updateAppointment(appointment: Appointments, idCita: number){
    this.dialogData = appointment;
    console.log(this.dialogData)
    return this.httpClient.put(`http://localhost:8000/api/citas/${idCita}` , this.dialogData);

    // this.httpClient.put(this.API_URL + appointments.id, appointments)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = appointments;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteAppointments(id: number): void {
    console.log(id);

    // this.httpClient.delete(this.API_URL + id)
    //     .subscribe({
    //       next: (data) => {
    //         console.log(id);
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
}
