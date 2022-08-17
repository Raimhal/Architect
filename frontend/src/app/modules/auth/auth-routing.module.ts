import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageLayoutComponent } from "./auth-page-layout/auth-page-layout.component";
import { AuthLoginFormComponent } from "./auth-login-form/auth-login-form.component";
import {
  AuthChangeDefaultPasswordFormComponent
} from "./auth-change-default-password-form/auth-change-default-password-form.component";
import { AuthChangePasswordFormComponent } from "./auth-change-password-form/auth-change-password-form.component";

const routes: Routes = [
  {
    path: 'login',
    component: AuthPageLayoutComponent,
    children: [
      { path: '', component: AuthLoginFormComponent },
      { path: 'change-default-password', component: AuthChangeDefaultPasswordFormComponent },
      { path: 'change-password', component: AuthChangePasswordFormComponent },
      //{ path: 'forgot-password', component: ... },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
