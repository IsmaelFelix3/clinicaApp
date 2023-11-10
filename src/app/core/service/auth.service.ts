import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'environments/environment';
import { Administrador } from 'app/interfaces/Administrador';
import { UsuarioResponse } from 'app/interfaces/Usuario';
import { Medico } from '../../interfaces/Medico.interface';
import { Paciente } from 'app/interfaces/Paciente.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Administrador|Medico|Paciente>;
  public currentUser: Observable<Administrador|Medico|Paciente>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Administrador|Medico|Paciente>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Administrador|Medico|Paciente {
    return this.currentUserSubject.value;
  }

  loginAdmin(correo: string, password: string) {
    console.log('sing in')
    return this.http.post<UsuarioResponse>(`${environment.api}auth/login`, {
        correo,
        password,
      })
      .pipe(
        map((admin) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(admin)
          localStorage.setItem('currentUser', JSON.stringify(admin));
          this.currentUserSubject.next(admin.userLogin);
          return admin;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }
}
