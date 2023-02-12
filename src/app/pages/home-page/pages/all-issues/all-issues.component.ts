import { Issues } from './../../../../shared/models/issues.model';
import { IssuesService } from './../../../../shared/services/issues.service';
import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/shared/models/data-login.model';
import { Router } from '@angular/router';

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
  checked: boolean = false;
  loadingData: boolean = false;
  persistanceLoading: boolean = false;

  constructor(
    private issuesService: IssuesService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    this.loggedUser = JSON.parse(sessionStorage.getItem('user'));
    await this.getIssues(this.checked);
  }

  dragStart(issue: Issues) {
    this.draggedIssue = issue;
  }

  dragEnd() {
    this.draggedIssue = null;
  }

  async dropToDo() {
    if (this.draggedIssue && this.draggedIssue.state != 'TODO') {
      this.persistanceLoading = true;
      this.draggedIssue.state = 'TODO';
      this.issuesToDo = [...this.issuesToDo, this.draggedIssue];
      this.issuesInProgress = this.issuesInProgress.filter(i => i._id != this.draggedIssue._id);
      this.issuesDone = this.issuesDone.filter(i => i._id != this.draggedIssue._id);
      this.issuesDeliverable = this.issuesDeliverable.filter(i => i._id != this.draggedIssue._id);
      await this.issuesService.modifyIssue(this.draggedIssue).toPromise();
      this.draggedIssue = null;
      this.persistanceLoading = false;
    }
  }

  async dropInProgress() {
    if (this.draggedIssue && this.draggedIssue.state != 'IN_PROGRESS') {
      this.persistanceLoading = true;
      this.draggedIssue.state = 'IN_PROGRESS';
      this.issuesInProgress = [...this.issuesInProgress, this.draggedIssue];
      this.issuesToDo = this.issuesToDo.filter(i => i._id != this.draggedIssue._id);
      this.issuesDone = this.issuesDone.filter(i => i._id != this.draggedIssue._id);
      this.issuesDeliverable = this.issuesDeliverable.filter(i => i._id != this.draggedIssue._id);
      await this.issuesService.modifyIssue(this.draggedIssue).toPromise();
      this.draggedIssue = null;
      this.persistanceLoading = false;
    }
  }

  async dropDone() {
    if (this.draggedIssue && this.draggedIssue.state != 'DONE') {
      this.persistanceLoading = true;
      this.draggedIssue.state = 'DONE';
      this.issuesDone = [...this.issuesDone, this.draggedIssue];
      this.issuesToDo = this.issuesToDo.filter(i => i._id != this.draggedIssue._id);
      this.issuesInProgress = this.issuesInProgress.filter(i => i._id != this.draggedIssue._id);
      this.issuesDeliverable = this.issuesDeliverable.filter(i => i._id != this.draggedIssue._id);
      await this.issuesService.modifyIssue(this.draggedIssue).toPromise();
      this.draggedIssue = null;
      this.persistanceLoading = false;
    }
  }

  async dropDeliverable() {
    if (this.draggedIssue && this.draggedIssue.state != 'DELIVERABLE') {
      this.persistanceLoading = true;
      this.draggedIssue.state = 'DELIVERABLE';
      this.issuesDeliverable = [...this.issuesDeliverable, this.draggedIssue];
      this.issuesToDo = this.issuesToDo.filter(i => i._id != this.draggedIssue._id);
      this.issuesInProgress = this.issuesInProgress.filter(i => i._id != this.draggedIssue._id);
      this.issuesDone = this.issuesDone.filter(i => i._id != this.draggedIssue._id);
      await this.issuesService.modifyIssue(this.draggedIssue).toPromise();
      this.draggedIssue = null;
      this.persistanceLoading = false;
    }
  }

  async getIssues(filter: boolean){
    this.loadingData = true;
    this.issuesService.getAllIssues().subscribe(
      resp => {
        this.allIssues = filter ? resp.filter(i => i.fkUserId === this.loggedUser.id) : resp;
        this.issuesToDo = this.allIssues.filter(i => i.state === 'TODO');
        this.issuesInProgress = this.allIssues.filter(i => i.state === 'IN_PROGRESS');
        this.issuesDone = this.allIssues.filter(i => i.state === 'DONE');
        this.issuesDeliverable = this.allIssues.filter(i => i.state === 'DELIVERABLE');
        this.loadingData = false;
        this.persistanceLoading = false;
      }
    );
  }

  filterIssue(event) {
    this.getIssues(event.checked);
  }

  goToDetail(id: number){
    this.router.navigate(['/angular-project/detail'], {
      queryParams: {
        id: id,
      }
    });
  }

}
