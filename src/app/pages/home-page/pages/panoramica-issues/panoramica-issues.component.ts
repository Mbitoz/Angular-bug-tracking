import { Component, OnInit } from '@angular/core';
import { Issues } from 'src/app/shared/models/issues.model';
import { IssuesService } from 'src/app/shared/services/issues.service';

@Component({
  selector: 'app-panoramica-issues',
  templateUrl: './panoramica-issues.component.html',
  styleUrls: ['./panoramica-issues.component.scss']
})
export class PanoramicaIssuesComponent implements OnInit {

  data: any;
  allIssues: Array<Issues> = [];

  constructor(
    private issuesService: IssuesService
  ) { }

  async ngOnInit() {
    this.allIssues = await this.issuesService.getAllIssues().toPromise();
    this.data = {
      labels: ['Todo','In Progress','Done', 'Deliverable'],
      datasets: [
          {
              data: [
                this.allIssues.filter(i => i.state === 'TODO').length, 
                this.allIssues.filter(i => i.state === 'IN_PROGRESS').length, 
                this.allIssues.filter(i => i.state === 'DONE').length,
                this.allIssues.filter(i => i.state === 'DELIVERABLE').length
              ],
              backgroundColor: [
                  "#42A5F5",
                  "#ff6699",
                  "#FFA726",
                  "#66BB6A",
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#ff99bb",
                  "#FFB74D",
                  "#81C784",
              ]
          }
      ]
  };
  }

}
