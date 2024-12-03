import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Administrador } from 'app/interfaces/Administrador';
import { env } from 'echarts';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  urlApi: string = environment.api;
  adminEndpoint: string = environment.adminEndpoint

  constructor(public http: HttpClient) { }

  getAdminByEmail( correo: string ){
    return this.http.post<Administrador>(`${this.urlApi}${this.adminEndpoint}getAdminByEmail`, {correo});
  }
}
