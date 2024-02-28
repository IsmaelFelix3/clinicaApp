import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Administrador } from 'app/interfaces/Administrador';
import { Usuario } from 'app/interfaces/Usuario';
import { Medico } from '../../interfaces/Medico.interface';
import { Paciente } from 'app/interfaces/Paciente.interface';
import { UserLogin } from '../../interfaces/Usuario';
import { AuthRenew } from 'app/interfaces/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<UserLogin>;
  public currentUser: Observable<UserLogin>;

  public user?: UserLogin;

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
          // localStorage.setItem('currentUser', JSON.stringify(admin));
          localStorage.setItem('token', admin.token);
          console.log(admin, 'admin admoin')
          this.currentUserSubject.next(admin.userLogin);
          localStorage.setItem('currentUser', JSON.stringify(admin.userLogin))
          return admin;
        })
      );
  }

  checkAuthentication() {
    if( !localStorage.getItem('token') ) return of(false);
    
    const token = localStorage.getItem('token');
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}` || '');

    return this.http.get<UserLogin>(`${environment.api}auth/renew`, {headers})
    .pipe(
      tap( user => { 
        this.user = user;
        this.currentUserSubject.next(user);
        console.log( this.currentUserSubject)
      }),
      map( user => !!user ),
      catchError( err => of(false) )
      )
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }
}
