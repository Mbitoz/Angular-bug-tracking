import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  HttpClientModule
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CommonSharedModule } from './components/common.module';
import { DataLoginService } from './shared/services/data-login.service';
import { RouteGuardService } from './shared/route-guard/bt-route.guard';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IssuesService } from './shared/services/issues.service';
import { AllIssuesComponent } from './pages/home-page/pages/all-issues/all-issues.component';
import { CreateIssueComponent } from './pages/home-page/pages/create-issue/create-issue.component';
import { TipologicheService } from './shared/services/tipologiche.service';
import { SearchIssuesComponent } from './pages/home-page/pages/search-issues/search-issues.component';
import { SearchIssuesFormComponent } from './pages/home-page/pages/search-issues/search-issues-form/search-issues-form.component';
import { SearchIssuesTableComponent } from './pages/home-page/pages/search-issues/search-issues-table/search-issues-table.component';
import { PanoramicaIssuesComponent } from './pages/home-page/pages/panoramica-issues/panoramica-issues.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    HeaderComponent,
    FooterComponent,
    AllIssuesComponent,
    CreateIssueComponent,
    SearchIssuesComponent,
    SearchIssuesFormComponent,
    SearchIssuesTableComponent,
    PanoramicaIssuesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonSharedModule
  ],
  providers: [
    AppService,
    DataLoginService,
    RouteGuardService,
    MessageService,
    ConfirmationService,
    IssuesService,
    TipologicheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
