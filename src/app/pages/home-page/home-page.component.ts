import { PanoramicaIssuesComponent } from './pages/panoramica-issues/panoramica-issues.component';
import { Users } from './../../shared/models/data-login.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AllIssuesComponent } from './pages/all-issues/all-issues.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  @ViewChild('allIssues') allIssues: AllIssuesComponent;
  @ViewChild('panoramicaIssues') panoramicaIssues: PanoramicaIssuesComponent;

  items: MenuItem[];
  loggedUser: Users;
  index: number;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      this.index = params.index ? parseInt(params.index) : 0;
    });
  }

  ngOnInit() {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user'));
    this.items = [
      {
        label: `<b>${this.loggedUser.username} </b>`,
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

  reinitializeMyComponent(event) {
    if (event.index === 0) {
      this.allIssues.ngOnInit();
    }
    if (event.index === 2) {
      this.panoramicaIssues.ngOnInit();
    }
  }

  redirectToDashboard(){
    this.router.navigate(['/angular-project/dashboard']);
  }

}
