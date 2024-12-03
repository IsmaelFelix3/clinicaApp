import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppoinmentsCount, Appointment, Appointments, History } from './appointments.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AppoinmentByIdResponse, AppoinmentsByDate, AppoinmentsByMedicAndDate, CitaReportPost, CitaReportRequest, NuevaCita } from 'app/interfaces/Cita.interface';
import { environment } from 'environments/environment';
@Injectable()
export class AppointmentsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/doc-appointments.json';
  urlEndpoint : string = environment.appoinmentsEndpoints;
  urlApi: string = environment.api;
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
    console.log('first')
    return this.httpClient.get<Appointments[]>(`${this.urlApi}${this.urlEndpoint}${idMedico}`);
  }

  getAppoinmentsByMonth(idMedico: number){
    return this.httpClient.get<AppoinmentsCount>(`${this.urlApi}${this.urlEndpoint}appoinmentsByMonth/${idMedico}`)
  }

  getAllAppoinmentsAdmin(){
    return this.httpClient.get<Appointments[]>(`${this.urlApi}${this.urlEndpoint}citasAdmin/`);
  }

  getAppointmentById(idCita: number){
    return this.httpClient.get<AppoinmentByIdResponse>(`${this.urlApi}${this.urlEndpoint}getAppoinmentById/${idCita}`);
  }

  getTakenSlots(selectedDate: string){
    return this.httpClient.get(`${this.urlApi}${this.urlEndpoint}takenSlots/${selectedDate}`);
  }
  addAppointments(appointments: Appointments): void {
    this.dialogData = appointments;
  }

  getLastAppoinment(idPaciente: number, idMedico: number){
    const params = new HttpParams().set('idPaciente', idPaciente).set('idMedico', idMedico);
    return this.httpClient.get(`${this.urlApi}${this.urlEndpoint}lastAppoinment/`, {params});
  }

  getAppointmentsHistory(idPaciente: number, idMedico: number){
    const params = new HttpParams().set('idPaciente', idPaciente).set('idMedico', idMedico);
    return this.httpClient.get<History>(`${this.urlApi}${this.urlEndpoint}appointmentsHistory/`, {params});
  }

  addAppoinment(newAppoinment: NuevaCita){
    return this.httpClient.post(`${this.urlApi}${this.urlEndpoint}`, newAppoinment);
  }
  updateAppointment(appointment: Appointments, idCita: number){
    this.dialogData = appointment;
    console.log(this.dialogData)
    return this.httpClient.put(`${this.urlApi}${this.urlEndpoint}${idCita}` , this.dialogData);
  }
  updateAppointmentDate(appointment: NuevaCita, idCita: number){
    // this.dialogData = appointment;
    // console.log(this.dialogData)
    return this.httpClient.put(`${this.urlApi}${this.urlEndpoint}${idCita}` , appointment);
  }
  deleteAppointments(id: number): void {
    console.log(id);
  }
  postAppoinmentsByDateAndMedic(idMedico: number, fecha: string){
    const body = {
      idMedico,
      fecha
    }
    return this.httpClient.post<AppoinmentsByMedicAndDate>(`${this.urlApi}${this.urlEndpoint}appoinmentsByMedicAndDate/`, body);
  }

  getAppointmentsByDate(date: string){
    return this.httpClient.get<AppoinmentsByDate>(`${this.urlApi}${this.urlEndpoint}appoinmentsByDate/${date}`);
  }

  getAppoinmentsByDateAndType(body: CitaReportPost){
    return this.httpClient.post<CitaReportRequest>(`${this.urlApi}${this.urlEndpoint}appoinmentsByDateAndType/`, body);

  }

  getEvolutionNotes(){
    return this.httpClient.get(`${this.urlApi}${this.urlEndpoint}appoinmentsByDateAndType/`);
  }
}
