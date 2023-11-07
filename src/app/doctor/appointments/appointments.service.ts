import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment, Appointments, History } from './appointments.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AppoinmentByIdResponse, AppoinmentsByMedicAndDate, NuevaCita } from 'app/interfaces/Cita.interface';
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

    return this.httpClient.get<Appointments[]>(`http://localhost:8000/api/citas/${idMedico}`);
  }

  getAllAppoinmentsAdmin(){
    return this.httpClient.get<Appointments[]>(`http://localhost:8000/api/citas/citasAdmin/`);
  }

  getAppointmentById(idCita: number){
    return this.httpClient.get<AppoinmentByIdResponse>(`http://localhost:8000/api/citas/getAppoinmentById/${idCita}`);
  }

  getTakenSlots(selectedDate: string){
    return this.httpClient.get(`http://localhost:8000/api/citas/takenSlots/${selectedDate}`);
  }
  addAppointments(appointments: Appointments): void {
    this.dialogData = appointments;
  }

  getLastAppoinment(idPaciente: number){
    return this.httpClient.get(`http://localhost:8000/api/citas/lastAppoinment/${idPaciente}`);
  }

  getAppointmentsHistory(idPaciente: number){
    return this.httpClient.get<History>(`http://localhost:8000/api/citas/appointmentsHistory/${idPaciente}`);
  }

  addAppoinment(newAppoinment: NuevaCita){
    return this.httpClient.post(`http://localhost:8000/api/citas/`, newAppoinment);
  }
  updateAppointment(appointment: Appointments, idCita: number){
    this.dialogData = appointment;
    console.log(this.dialogData)
    return this.httpClient.put(`http://localhost:8000/api/citas/${idCita}` , this.dialogData);
  }
  updateAppointmentDate(appointment: NuevaCita, idCita: number){
    // this.dialogData = appointment;
    // console.log(this.dialogData)
    return this.httpClient.put(`http://localhost:8000/api/citas/${idCita}` , appointment);
  }
  deleteAppointments(id: number): void {
    console.log(id);
  }
  postAppoinmentsByDateAndMedic(idMedico: number, fecha: string){
    const body = {
      idMedico,
      fecha
    }
    return this.httpClient.post<AppoinmentsByMedicAndDate>(`http://localhost:8000/api/citas/appoinmentsByMedicAndDate/`, body);
  }
}
