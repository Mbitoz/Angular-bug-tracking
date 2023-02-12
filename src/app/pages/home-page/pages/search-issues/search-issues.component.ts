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
