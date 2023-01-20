import { Users } from './../../shared/models/data-login.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  items: MenuItem[];
  loggedUser: Users;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user'));
    this.items = [
      {
        label: `Benvenuto <b>${this.loggedUser.username} </b>`,
        icon: 'pi pi-fw pi-user',
        escape: false,
      }
    ];
  }

  logout(event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Sei sicuro di volere effettuare il logout?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        sessionStorage.clear();
        this.router.navigate(['/angular-project/login']);
      },
      reject: () => {
        //reject action
      }
    });
  }

}
