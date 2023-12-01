import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { authGuardGuard } from './auth-guard.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'forgot-password',canActivate:[authGuardGuard] , component : ForgotPasswordComponent},
  {path : 'dashboard', component : DashboardComponent},
  {path : 'login', pathMatch : 'full', redirectTo : 'login'},
  {path : '**', component : NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
