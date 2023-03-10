import { DetailIssueComponent } from './pages/home-page/pages/detail-issue/detail-issue.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RouteGuardService } from './shared/route-guard/bt-route.guard';

const routes: Routes = [
  {path: 'angular-project/dashboard', component: DashboardComponent, canActivate: [RouteGuardService] },
  {path: 'angular-project/home-page', component: HomePageComponent, canActivate: [RouteGuardService] },
  {path: 'angular-project/login', component: LoginPageComponent},
  {path: 'angular-project/detail', component: DetailIssueComponent, canActivate: [RouteGuardService]},
  {path: '', redirectTo: '/angular-project/login', pathMatch: 'full'},
  {path: 'angular-project', redirectTo: '/angular-project/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
