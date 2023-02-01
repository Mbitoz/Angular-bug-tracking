import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Users } from 'src/app/shared/models/data-login.model';
import { Tipologica } from 'src/app/shared/models/issues.model';
import { DataLoginService } from 'src/app/shared/services/data-login.service';
import { TipologicheService } from 'src/app/shared/services/tipologiche.service';

@Component({
  selector: 'app-search-issues-form',
  templateUrl: './search-issues-form.component.html',
  styleUrls: ['./search-issues-form.component.scss']
})
export class SearchIssuesFormComponent implements OnInit {

  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

  formSearchIssue: FormGroup;
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
    this.formSearchIssue = new FormGroup({
      title: new FormControl(null),
      openTo: new FormControl(null),
      fkUserId: new FormControl(null),
      priority: new FormControl(null),
      description: new FormControl(null)
    });
  }

  searchIssue(){
    this.onSearch.emit(this.formSearchIssue.value);
  }

}
