import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RouteGuardService } from './shared/route-guard/bt-route.guard';

const routes: Routes = [
  {path: 'angular-project/home-page', component: HomePageComponent, canActivate: [RouteGuardService] },
  {path: 'angular-project/login', component: LoginPageComponent},
  {path: '', redirectTo: '/angular-project/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
