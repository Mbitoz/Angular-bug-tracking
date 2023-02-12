import { Issues } from './../../../../shared/models/issues.model';
import { Users } from './../../../../shared/models/data-login.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { DataLoginService } from 'src/app/shared/services/data-login.service';
import { TipologicheService } from 'src/app/shared/services/tipologiche.service';
import { Tipologica } from 'src/app/shared/models/issues.model';
import { MessageService } from 'primeng/api';
import { IssuesService } from 'src/app/shared/services/issues.service';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {

  formCreateIssue: FormGroup;
  allUser: Array<Users> = [];
  tipologicaTo: Array<Tipologica> = [
    { value: 'FE', description: 'FrontEnd' },
    { value: 'BE', description: 'BackEnd' },
  ];
  tipologicaPriority: Array<Tipologica> = [
    { value: '-1', description: 'Bassa' },
    { value: '0', description: 'Media' },
    { value: '1', description: 'Alta' },
  ];
  loadingData: boolean = true;
  persistanceLoading: boolean = false;

  constructor(
    private dataLogin: DataLoginService,
    private tipologicaOpenTo: TipologicheService,
    private messageService: MessageService,
    private issuesService: IssuesService
  ) { }

  ngOnInit() {
    const $allUser = this.dataLogin.getUsers();
    //Utile per Tipologiche gestite persistenti sul DB
    const $tipologicaOpenTo = this.tipologicaOpenTo.getTipologiaOpenTo();
    const $tipologicaPriority = this.tipologicaOpenTo.getTipologiaPriority();
    forkJoin([
      $allUser,
      //$tipologicaOpenTo,
      //$tipologicaPriority
    ]).subscribe(
      result => {
        this.allUser = (result[0].filter( u => u.role != 'ADMIN'));
        // this.tipologicaTo = (result[1]);
        // this.tipologicaPriority = (result[2]);
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
    this.formCreateIssue = new FormGroup({
      title: new FormControl(null, Validators.required),
      openTo: new FormControl(null, Validators.required),
      fkUserId: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  async creaNuovaIssue(){
    // const allIssue = await this.issuesService.getAllIssues().toPromise();
    // let maxId = allIssue.length === 0 ? 0 : Math.max(...allIssue.map(element => element.id))
    // newIssue.id = maxId + 1;
    this.persistanceLoading = true;
    const newIssue: Issues = this.formCreateIssue.value;
    newIssue.state = 'TODO';
    newIssue.fkUserIdDecode = this.allUser.find(u => u.id === newIssue.fkUserId).username;
    newIssue.numberIssue = newIssue.numberIssue + 1;
    this.issuesService.createIssue(newIssue).subscribe(
      res => {
        this.messageService.add({severity:'success', summary: 'Info', detail: 'Issue creata con successo'});
        this.formCreateIssue.reset();
        this.persistanceLoading = false;
      }
    );
  }

}
