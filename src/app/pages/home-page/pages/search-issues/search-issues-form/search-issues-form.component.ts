import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Users } from 'src/app/shared/models/data-login.model';
import { Tipologica } from 'src/app/shared/models/issues.model';

@Component({
  selector: 'app-search-issues-form',
  templateUrl: './search-issues-form.component.html',
  styleUrls: ['./search-issues-form.component.scss']
})
export class SearchIssuesFormComponent implements OnInit {

  @Input()  allUser: Array<Users>;
  @Input()  tipologicaTo: Array<Tipologica>;
  @Input()  tipologicaPriority: Array<Tipologica>;
  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

  formSearchIssue: FormGroup;

  loadingData: boolean = true;
  stateOptions: Array<any> = [
    { label: 'Todo', value: 'TODO' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Done', value: 'DONE' },
    { label: 'Deliverable', value: 'DELIVERABLE' }
  ];

  constructor() { }

  ngOnInit() {
    this.initForm();
  }


  initForm(){
    this.formSearchIssue = new FormGroup({
      title: new FormControl(null),
      openTo: new FormControl(null),
      fkUserId: new FormControl(null),
      priority: new FormControl(null),
      description: new FormControl(null),
      state: new FormControl(null)
    });
  }

  searchIssue(){
    this.onSearch.emit(this.formSearchIssue.value);
  }

}
