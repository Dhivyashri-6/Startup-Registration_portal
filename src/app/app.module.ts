import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { WelcomeComponent } from './components/shared/welcome/welcome.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { UserDashboardComponent } from './components/user/dashboard/user-dashboard.component';
import { RegistrationFormComponent } from './components/user/registration-form/registration-form.component';
import { StatusComponent } from './components/user/status/status.component';
import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard.component';
import { PendingStartupsComponent } from './components/admin/pending-startups/pending-startups.component';
import { RejectedStartupsComponent } from './components/admin/rejected-startups/rejected-startups.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    UserDashboardComponent,
    RegistrationFormComponent,
    StatusComponent,
    AdminDashboardComponent,
    PendingStartupsComponent,
    RejectedStartupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }