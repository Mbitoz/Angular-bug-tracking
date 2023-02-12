import { Issues } from './../../../../shared/models/issues.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Users } from 'src/app/shared/models/data-login.model';
import { Tipologica } from 'src/app/shared/models/issues.model';
import { DataLoginService } from 'src/app/shared/services/data-login.service';
import { IssuesService } from 'src/app/shared/services/issues.service';
import { TipologicheService } from 'src/app/shared/services/tipologiche.service';
import { Location } from '@angular/common';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';


@Component({
  selector: 'app-detail-issue',
  templateUrl: './detail-issue.component.html',
  styleUrls: ['./detail-issue.component.scss']
})
export class DetailIssueComponent implements OnInit {

  formDetailIssue: FormGroup;
  allUser: Array<Users> = [];
  tipologicaTo: Array<Tipologica> = [];
  tipologicaPriority: Array<Tipologica> = [];
  detailIssue: Issues;
  loadingData: boolean = true;
  issueId: number;
  loggedUser: Users;
  items: MenuItem[];
  stateOptions: Array<any> = [
    {label: 'Todo', value: 'TODO'}, 
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'Done', value: 'DONE'}, 
    {label: 'Deliverable', value: 'DELIVERABLE'}
  ];


  constructor(
    private dataLogin: DataLoginService,
    private tipologicaOpenTo: TipologicheService,
    private issuesService: IssuesService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.issueId = params.id ? parseInt(params.id) : 0;
    });
    if(!this.issueId){
      this.location.back();
    }
    this.loggedUser = JSON.parse(sessionStorage.getItem('user'));
    this.items = [
      {
        label: `<b>${this.loggedUser.username} </b>`,
        icon: 'pi pi-fw pi-user',
        escape: false,
      }
    ];
   }

  ngOnInit() {
    const $allUser = this.dataLogin.getUsers();
    const $tipologicaOpenTo = this.tipologicaOpenTo.getTipologiaOpenTo();
    const $tipologicaPriority = this.tipologicaOpenTo.getTipologiaPriority();
    const $getIssue = this.issuesService.getIssueById(this.issueId);
    forkJoin([
      $allUser,
      $tipologicaOpenTo,
      $tipologicaPriority,
      $getIssue
    ]).subscribe(
      result => {
        this.allUser = (result[0].filter( u => u.role != 'ADMIN'));
        this.tipologicaTo = (result[1]);
        this.tipologicaPriority = (result[2]);
        if(result[3] && result[3].length > 0){
          const issueArrayTemp = (result[3]);
          this.detailIssue = issueArrayTemp[0];
        } else {
          this.location.back();
        }
      },
      error => {

      },
      () => {
        this.initForm();
        this.loadingData = false;
      }
    );
  }

  initForm(){
    this.formDetailIssue = new FormGroup({
      title: new FormControl(this.detailIssue.title, Validators.required),
      openTo: new FormControl(this.detailIssue.openTo, Validators.required),
      fkUserId: new FormControl(this.detailIssue.fkUserId, Validators.required),
      priority: new FormControl(this.detailIssue.priority, Validators.required),
      description: new FormControl(this.detailIssue.description, Validators.required),
      state: new FormControl(this.detailIssue.state, Validators.required),
    });
    if(this.loggedUser.role != 'ADMIN'){
      this.formDetailIssue.disable();
    }
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

  modifyIssue(){
    const issue = this.formDetailIssue.value;
    issue._id = this.detailIssue._id;
    issue.fkUserIdDecode = this.allUser.find(u => u.id === issue.fkUserId).username;
    this.issuesService.modifyIssue(this.formDetailIssue.value).subscribe(
      res => {
        this.messageService.add({severity:'success', summary: 'Info', detail: 'Issue modificata con successo'});
        this.location.back();
      }
    );
  }

  redirectToDashboard(){
    this.router.navigate(['/angular-project/dashboard']);
  }

  goBack(){
    this.location.back();
  }

}
