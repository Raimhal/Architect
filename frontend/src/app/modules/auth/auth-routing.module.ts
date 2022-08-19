import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageLayoutComponent } from "./auth-page-layout/auth-page-layout.component";
import { AuthLoginFormComponent } from "./auth-login-form/auth-login-form.component";
import {
  AuthChangeDefaultPasswordFormComponent
} from "./auth-change-default-password-form/auth-change-default-password-form.component";
import { AuthChangePasswordFormComponent } from "./auth-change-password-form/auth-change-password-form.component";
import { ForgotPasswordComponent } from './auth-forgot-password/auth-forgot-password';

const routes: Routes = [
  { path: 'login', component: AuthLoginFormComponent },
  { path: 'reset-password', component: ForgotPasswordComponent },
  { path: 'change-password', component: AuthChangePasswordFormComponent },
  { path: 'change-default-password', component: AuthChangeDefaultPasswordFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
