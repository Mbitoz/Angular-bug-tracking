import { Issues } from './../../../../shared/models/issues.model';
import { IssuesService } from './../../../../shared/services/issues.service';
import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/shared/models/data-login.model';

@Component({
  selector: 'app-all-issues',
  templateUrl: './all-issues.component.html',
  styleUrls: ['./all-issues.component.scss']
})
export class AllIssuesComponent implements OnInit {

  allIssues: Array<Issues> = [];
  issuesToDo: Array<Issues> = [];
  issuesInProgress: Array<Issues> = [];
  issuesDone: Array<Issues> = [];
  issuesDeliverable: Array<Issues> = [];
  draggedIssue: Issues;
  loggedUser: Users;

  constructor(
    private issuesService: IssuesService
  ) {
   }

  ngOnInit() {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user'));
    this.issuesService.getAllIssues().subscribe(
      resp => {
        this.allIssues = resp;
        this.issuesToDo = this.allIssues.filter(i => i.state === 'TODO');
        this.issuesInProgress = this.allIssues.filter(i => i.state === 'IN_PROGRESS');
        this.issuesDone = this.allIssues.filter(i => i.state === 'DONE');
        this.issuesDeliverable = this.allIssues.filter(i => i.state === 'DELIVERABLE');
      }
    );
  }

  dragStart(issue: Issues) {
    this.draggedIssue = issue;
  }

  dragEnd() {
    this.draggedIssue = null;
  }

  async dropToDo() {
    if (this.draggedIssue && this.draggedIssue.state != 'TODO') {
        this.draggedIssue.state = 'TODO';
        this.issuesToDo = [...this.issuesToDo, this.draggedIssue];
        this.issuesInProgress = this.issuesInProgress.filter( i => i.id != this.draggedIssue.id);
        this.issuesDone = this.issuesDone.filter( i => i.id != this.draggedIssue.id);
        this.issuesDeliverable = this.issuesDeliverable.filter( i => i.id != this.draggedIssue.id);
        await this.issuesService.modifyIssue(this.draggedIssue).toPromise();
        this.draggedIssue = null;
    }
  }

  async dropInProgress() {
    if (this.draggedIssue && this.draggedIssue.state != 'IN_PROGRESS') {
        this.draggedIssue.state = 'IN_PROGRESS';
        this.issuesInProgress = [...this.issuesInProgress, this.draggedIssue];
        this.issuesToDo = this.issuesToDo.filter( i => i.id != this.draggedIssue.id);
        this.issuesDone = this.issuesDone.filter( i => i.id != this.draggedIssue.id);
        this.issuesDeliverable = this.issuesDeliverable.filter( i => i.id != this.draggedIssue.id);
        await this.issuesService.modifyIssue(this.draggedIssue).toPromise();
        this.draggedIssue = null;
    }
}

async dropDone() {
  if (this.draggedIssue && this.draggedIssue.state != 'DONE') {
      this.draggedIssue.state = 'DONE';
      this.issuesDone = [...this.issuesDone, this.draggedIssue];
      this.issuesToDo = this.issuesToDo.filter( i => i.id != this.draggedIssue.id);
      this.issuesInProgress = this.issuesInProgress.filter( i => i.id != this.draggedIssue.id);
      this.issuesDeliverable = this.issuesDeliverable.filter( i => i.id != this.draggedIssue.id);
      await this.issuesService.modifyIssue(this.draggedIssue).toPromise();
      this.draggedIssue = null;
  }
}

async dropDeliverable() {
  if (this.draggedIssue && this.draggedIssue.state != 'DELIVERABLE') {
      this.draggedIssue.state = 'DELIVERABLE';
      this.issuesDeliverable = [...this.issuesDeliverable, this.draggedIssue];
      this.issuesToDo = this.issuesToDo.filter( i => i.id != this.draggedIssue.id);
      this.issuesInProgress = this.issuesInProgress.filter( i => i.id != this.draggedIssue.id);
      this.issuesDone = this.issuesDone.filter( i => i.id != this.draggedIssue.id);
      await this.issuesService.modifyIssue(this.draggedIssue).toPromise();
      this.draggedIssue = null;
  }
}




}
