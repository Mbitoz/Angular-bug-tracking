import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataLoginService } from 'src/app/shared/services/data-login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private dataLogin: DataLoginService,
    private router: Router
    ) { }

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if(user){
      this.router.navigate(['/angular-project/home-page']);
    }
  }

  login(){
    const username = '';
    const password = '';
    this.dataLogin.getUsers().subscribe(
      response => {
        const userLogged: any = response.find( u => u.username === username && u.password === password);
        if(userLogged){
          sessionStorage.setItem('user', userLogged);
          this.router.navigate(['/angular-project/home-page']);
        } else {
          //Utente non autenticato
        }
      }
    );
  }

}
