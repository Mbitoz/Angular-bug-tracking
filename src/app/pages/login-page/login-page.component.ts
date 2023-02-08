import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataLoginService } from 'src/app/shared/services/data-login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  formLogin: FormGroup;
  checkUser: boolean = false;
  invalidLogin: boolean = false;

  constructor(
    private dataLogin: DataLoginService,
    private router: Router,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    this.checkUser = true;
    const user = JSON.parse(sessionStorage.getItem('user'));
    setTimeout(() => {
      if(user){
        this.messageService.add({severity:'info', summary: 'Info', detail: 'Sei già autenticato, verrai reindirizzato alla Dashboard'});
        this.router.navigate(['/angular-project/dashboard']);
      } else {
        this.checkUser = false;
      }
      this.initForm();
    }, 1000);
    
  }

  initForm(){
    this.formLogin = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.formLogin.valueChanges.subscribe(
      value => {
        this.invalidLogin = false;
      }
    );
  }

  login(){
    this.invalidLogin = false;
    const username = this.formLogin.controls['username'].value;
    const password = this.formLogin.controls['password'].value;
    this.dataLogin.getUsers().subscribe(
      response => {
        const userLogged: any = response.find( u => u.username === username && u.password === password);
        if(userLogged){
          sessionStorage.setItem('user',JSON.stringify(userLogged));
          this.router.navigate(['/angular-project/dashboard']);
        } else {
          this.invalidLogin = true;
        }
      }
    );
  }

}
