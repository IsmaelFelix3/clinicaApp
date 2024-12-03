import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from "rxjs";
import { AuthService } from '../service/auth.service';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate, CanMatch {

  constructor(private authService: AuthService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  | Observable<boolean>{
    console.log('rol guard Admin')

    if(this.authService.currentUserValue.userLogin.rol != 'Admin'){
      return false;
    }
    return true;
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean> {
    console.log('rol guard Admin')

    if(this.authService.currentUserValue.userLogin.rol != 'Admin'){
      return false;
    }
    return true;
  }
}
