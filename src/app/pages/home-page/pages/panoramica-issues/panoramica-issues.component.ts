import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Issues } from 'src/app/shared/models/issues.model';
import { IssuesService } from 'src/app/shared/services/issues.service';

@Component({
  selector: 'app-panoramica-issues',
  templateUrl: './panoramica-issues.component.html',
  styleUrls: ['./panoramica-issues.component.scss']
})
export class PanoramicaIssuesComponent implements OnInit {

  @ViewChild("tableIssues", { static: false }) tableIssues: ElementRef;

  data: any;
  allIssues: Array<Issues> = [];
  dataTableIssues: Array<Issues> = [];
  loadingData: boolean = false;


  constructor(
    private issuesService: IssuesService
  ) { }

  async ngOnInit() {
    this.loadingData = true;
    this.dataTableIssues = [];
    this.allIssues = await this.issuesService.getAllIssues().toPromise();
    if(this.allIssues.length > 0){
      this.data = {
        labels: ['Todo', 'In Progress', 'Done', 'Deliverable'],
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
    this.loadingData = false;
  }

  chartClick(event) {
    const filterValue = event.element._model.label;
    switch (filterValue) {
      case 'Todo':
        this.dataTableIssues = this.allIssues.filter(i => i.state === 'TODO');
        break;
      case 'In Progress':
        this.dataTableIssues = this.allIssues.filter(i => i.state === 'IN_PROGRESS');
        break;
      case 'Done':
        this.dataTableIssues = this.allIssues.filter(i => i.state === 'DONE');
        break;
      case 'Deliverable':
        this.dataTableIssues = this.allIssues.filter(i => i.state === 'DELIVERABLE');
        break;
    }
    setTimeout(() => {
      this.tableIssues.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 200);
  }

}
