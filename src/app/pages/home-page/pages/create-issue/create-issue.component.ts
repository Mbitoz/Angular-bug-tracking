import { Users } from './../../../../shared/models/data-login.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { DataLoginService } from 'src/app/shared/services/data-login.service';
import { TipologicheService } from 'src/app/shared/services/tipologiche.service';
import { Tipologica } from 'src/app/shared/models/issues.model';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {

  formCreateIssue: FormGroup;
  allUser: Array<Users> = [];
  tipologicaTo: Array<Tipologica> = [];
  tipologicaPriority: Array<Tipologica> = [];
  loadingData: boolean = true;

  constructor(
    private dataLogin: DataLoginService,
    private tipologicaOpenTo: TipologicheService
  ) { }

  ngOnInit() {
    const $allUser = this.dataLogin.getUsers();
    const $tipologicaOpenTo = this.tipologicaOpenTo.getTipologiaOpenTo();
    const $tipologicaPriority = this.tipologicaOpenTo.getTipologiaPriority();
    forkJoin([
      $allUser,
      $tipologicaOpenTo,
      $tipologicaPriority
    ]).subscribe(
      result => {
        this.allUser = (result[0].filter( u => u.role != 'ADMIN'));
        this.tipologicaTo = (result[1]);
        this.tipologicaPriority = (result[2]);
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
      assigneTo: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
    });
  }

}
