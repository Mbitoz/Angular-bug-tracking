import { Issues } from './../../../../../shared/models/issues.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-issues-table',
  templateUrl: './search-issues-table.component.html',
  styleUrls: ['./search-issues-table.component.scss']
})
export class SearchIssuesTableComponent implements OnInit {

  @Input() dataTableIssues: Array<Issues>;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goToDetail(id: number){
    this.router.navigate(['/angular-project/detail'], {
      queryParams: {
        id: id,
      }
    });
  }

}
