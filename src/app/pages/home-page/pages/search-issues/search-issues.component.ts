import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Issues } from 'src/app/shared/models/issues.model';
import { IssuesService } from 'src/app/shared/services/issues.service';

@Component({
  selector: 'app-search-issues',
  templateUrl: './search-issues.component.html',
  styleUrls: ['./search-issues.component.scss']
})
export class SearchIssuesComponent implements OnInit {

  @ViewChild("tableIssues", { static: false }) tableIssues: ElementRef;

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
        setTimeout(() => {
          this.dataTableIssues = resp;
          this.loadingRicerca = false;
          setTimeout(() => {
            this.tableIssues.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 200);
        }, 1000);
      }
    );
  }

  goToDetail(){

  }

}
