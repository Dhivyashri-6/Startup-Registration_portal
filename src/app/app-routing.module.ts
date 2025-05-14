import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './components/shared/welcome/welcome.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { UserDashboardComponent } from './components/user/dashboard/user-dashboard.component';
import { RegistrationFormComponent } from './components/user/registration-form/registration-form.component';
import { StatusComponent } from './components/user/status/status.component';
import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard.component';
import { PendingStartupsComponent } from './components/admin/pending-startups/pending-startups.component';
import { RejectedStartupsComponent } from './components/admin/rejected-startups/rejected-startups.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'user-dashboard', 
    component: UserDashboardComponent,
    children: [
      { path: 'register', component: RegistrationFormComponent },
      { path: 'status', component: StatusComponent },
      { path: '', redirectTo: 'register', pathMatch: 'full' }
    ]
  },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent,
    children: [
      { path: 'pending', component: PendingStartupsComponent },
      { path: 'rejected', component: RejectedStartupsComponent },
      { path: '', redirectTo: 'pending', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }