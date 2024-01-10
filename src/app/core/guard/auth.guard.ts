import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment, CanMatch, CanActivate } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  private checkAuthStatus(): boolean | Observable<boolean>{
    return this.authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        console.log(this.authService.currentUserValue)
        console.log('es autenticado ',isAuthenticated)
      }),
      tap( isAuthenticated => {
        if(!isAuthenticated){
          console.log('isAuthenticated False')
          this.router.navigate(['/authentication/signin']);
          return false;
        }
        return true;
      })
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('can activate')
    const token = localStorage.getItem('token');
    
    if(!token) return false;

    return this.checkAuthStatus();
  }

  canMatch( route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    console.log('can match')
    const token = localStorage.getItem('token');
    
    if(!token) return false;

    return this.checkAuthStatus();
  }
  
}
