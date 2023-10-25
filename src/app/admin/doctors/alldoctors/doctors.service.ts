import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Doctors } from './doctors.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Medico, Medicos } from 'app/interfaces/Medico.interface';
@Injectable()
export class DoctorsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/doctors.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Medico[]> = new BehaviorSubject<Medico[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Doctors;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Medico[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDoctorss(){

    return this.httpClient.get<Medicos>(`http://localhost:8000/api/medicos`);
    // this.subs.sink = this.httpClient.get<Medicos>(`http://localhost:8000/api/medicos`).subscribe({
    //   next: (data) => {
    //     this.isTblLoading = false;
    //     this.dataChange.next(data.medicos);
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.isTblLoading = false;
    //     console.log(error.name + ' ' + error.message);
    //   },
    // });
  }
  
  addDoctor(doctor: Medico){
    // this.dialogData = doctors;
    console.log(doctor)
    return this.httpClient.post(`http://localhost:8000/api/medicos`, doctor);
  }

  updateDoctors(doctors: Doctors): void {
    this.dialogData = doctors;

    // this.httpClient.put(this.API_URL + doctors.id, doctors)
    //     .subscribe({
    //       next: (data) => {
    //         this.dialogData = doctors;
    //       },
    //       error: (error: HttpErrorResponse) => {
    //          // error code here
    //       },
    //     });
  }
  deleteDoctors(id: number): void {
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
