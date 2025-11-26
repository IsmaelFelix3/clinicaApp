import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from "rxjs";
import { AuthService } from '../service/auth.service';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate, CanMatch {

  constructor(private authService: AuthService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean>{
    console.log('rol guard Admin')
    console.log(this.authService.currentUserValue.userLogin.rol)

    if(this.authService.currentUserValue.userLogin.rol != 'Admin' && this.authService.currentUserValue.userLogin.rol != 'SuperAdmin'){
      console.log('rol guard Admin entro acti')
      return false;
    }
    console.log('rol guard Admin entro acti', true)
    return true;
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean> {
    console.log('rol guard Admin')


    if(this.authService.currentUserValue.userLogin.rol != 'Admin' || this.authService.currentUserValue.userLogin.rol != 'SuperAdmin'){
      console.log('rol guard can ma')
      return false;
    }
    console.log('rol guard can ma', true)
    return true;
  }
}
