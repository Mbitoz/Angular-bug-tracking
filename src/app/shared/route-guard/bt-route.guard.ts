import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { DataLoginService } from '../services/data-login.service';

@Injectable({
  providedIn: 'root'
})

export class RouteGuardService implements CanActivate {

  constructor(
    private router: Router,
    private dataLoginService: DataLoginService) { }

  async canActivate() {
    //const user: any = sessionStorage.getItem('user');
    const user = {
        username: 'admin',
        password: 'admin'
    }
    const allUsers = await this.dataLoginService.getUsers().toPromise();
    if(user && allUsers.find(u => u.username === user.username && u.password === user.password)){
        return true;
    } else {
        this.openSnackBar('', '', false);
        this.router.navigate(['']);
        return false;
    }
  }

  openSnackBar(message: string, action: string, error: boolean) {
    if(error){
      //this.snackBar.open(message, action);
    }else{
    //   this.snackBar.open(message, action, {
    //     duration: 5000
    //   });
    }
  }
}