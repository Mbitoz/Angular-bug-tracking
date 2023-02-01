import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
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

  loadingRicerca: boolean = false;
  dataTableIssues: Array<Issues>;

  constructor(
    private issuesService: IssuesService
  ) { }

  ngOnInit() {
  }

  searchIssue(requestBody){
    this.loadingRicerca = true;
    this.issuesService.searchIssue(requestBody).subscribe(
      resp => {
        this.dataTableIssues = resp;
        this.loadingRicerca = false;
      }
    );
  }

  goToDetail(){

  }

}
