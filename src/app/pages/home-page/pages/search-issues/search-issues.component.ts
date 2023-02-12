import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Users } from 'src/app/shared/models/data-login.model';
import { Issues, Tipologica } from 'src/app/shared/models/issues.model';
import { DataLoginService } from 'src/app/shared/services/data-login.service';
import { IssuesService } from 'src/app/shared/services/issues.service';
import { TipologicheService } from 'src/app/shared/services/tipologiche.service';

@Component({
  selector: 'app-search-issues',
  templateUrl: './search-issues.component.html',
  styleUrls: ['./search-issues.component.scss']
})
export class SearchIssuesComponent implements OnInit {

  @ViewChild("tableIssues", { static: false }) tableIssues: ElementRef;

  loadingRicerca: boolean = false;
  dataTableIssues: Array<Issues>;
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

  loadingData: boolean = false;

  constructor(
    private issuesService: IssuesService,
    private dataLogin: DataLoginService,
    private tipologicaOpenTo: TipologicheService
  ) { }

  ngOnInit() {
    this.loadingData = true;
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
        this.loadingData = false;
      }
    );
  }

  searchIssue(requestBody){
    this.loadingRicerca = true;
    this.issuesService.getAllIssues().subscribe(
      resp => {
        setTimeout(() => {
          this.dataTableIssues = this.searchData(resp, requestBody);
          this.loadingRicerca = false;
          setTimeout(() => {
            this.tableIssues.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 200);
        }, 1000);
      }
    );
  }

  searchData(data, searchObj)  {
    return data.filter(item => {
      return Object.entries(searchObj).reduce((acc, [key, value]) => {
        return acc && (value === null || item[key].toString().toLowerCase().includes(value.toString().toLowerCase()));
      }, true);
    });
  };

}
