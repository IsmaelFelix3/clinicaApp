import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Administrador } from 'app/interfaces/Administrador';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient) { }

  getAdminByEmail( correo: string ){
    return this.http.post<Administrador>(`http://localhost:8000/api/admin/getAdminByEmail`, {correo});
  }
}
