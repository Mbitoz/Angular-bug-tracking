import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-shared-ngx-spinner',
  templateUrl: './shared-ngx-spinner.component.html',
  styleUrls: ['./shared-ngx-spinner.component.scss']
})
export class SharedNgxSpinnerComponent implements OnInit {

  @Input() spinnerText = 'Caricamento...'
  @Input() spinnerSize: 'small' | 'default' | 'medium' | 'large' = 'default'

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
  }

}
