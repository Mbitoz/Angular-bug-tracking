import { Issues } from './../../../../../shared/models/issues.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-issues-table',
  templateUrl: './search-issues-table.component.html',
  styleUrls: ['./search-issues-table.component.scss']
})
export class SearchIssuesTableComponent implements OnInit {

  @Input() dataTableIssues: Array<Issues>;

  constructor() { }

  ngOnInit() {
  }

  goToDetail(){

  }

}
