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
    const user: any = JSON.parse(sessionStorage.getItem('user'));
    const allUsers = await this.dataLoginService.getUsers().toPromise();
    if (user && allUsers.find(u => u.username.toUpperCase() === user.username.toUpperCase() && u.password === user.password)) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}