import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Users } from 'src/app/shared/models/data-login.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loggedUser: Users;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
  ) {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit() {
  }

  redirectTo(tab) {
    switch (tab) {
      case 'all-issues':
        this.router.navigate(['/angular-project/home-page'], {
          queryParams: {
            index: 0,
          }
        });
        break;
      case 'search':
        this.router.navigate(['/angular-project/home-page'], {
          queryParams: {
            index: 1,
          }
        });
        break;
      case 'overview':
        this.router.navigate(['/angular-project/home-page'], {
          queryParams: {
            index: 2,
          }
        });
        break;
      case 'new-issue':
        this.router.navigate(['/angular-project/home-page'], {
          queryParams: {
            index: 3,
          }
        });
        break;
      case 'git':
        window.open('https://github.com/Mbitoz/Angular-bug-tracking', "_blank");
        break;
    }

  }

  logout() {
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
