import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceService {

  constructor(private http: HttpClient) { }

  getAllSchedule(){
    return this.http.get(`http://localhost:8000/api/horarios`);
  }
}
