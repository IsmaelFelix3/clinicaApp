import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const urlApi: string  = environment.api
const urlEndpoint: string = 'horarios/'

@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceService {

  constructor(private http: HttpClient) { }

  getAllSchedule(){
    return this.http.get(`${urlApi}${urlEndpoint}`);
  }
}
