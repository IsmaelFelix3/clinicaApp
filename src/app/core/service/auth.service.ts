import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Administrador } from 'app/interfaces/Administrador';
import { Usuario } from 'app/interfaces/Usuario';
import { Medico } from '../../interfaces/Medico.interface';
import { Paciente } from 'app/interfaces/Paciente.interface';
import { UserLogin } from '../../interfaces/Usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserLogin>;
  public currentUser: Observable<UserLogin>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserLogin>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // public get currentUserValue(): Administrador | Medico | Paciente {
  public get currentUserValue(): any{
    return this.currentUserSubject.value;
  }

  loginAdmin(correo: string, password: string) {
    console.log('sing in')
    return this.http.post<Usuario>(`${environment.api}auth/login`, {
        correo,
        password,
      })
      .pipe(
        map((admin) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(admin, 'auth service')
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
