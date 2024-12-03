/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
})
export class Page404Component {
  constructor(public router: Router) {}

  redirect(){
    if(localStorage.getItem('token')){
      this.router.navigate(['./dashboard/']);
    }
    else{
      this.router.navigateByUrl('/authentication/signin');
    }
    // this.router.navigateByUrl('admin/dashboard/main');
  }
}
