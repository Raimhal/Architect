import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CompanyListComponent} from "./company-list/company-list.component";
import {CreateCompany} from "./createCompany/createCompany.component";
import {CompanyInformationComponent} from "./company-information/company-information.component";
import {HasRoleGuard} from "../../shared/has-role.guard";

const routes: Routes = [
  {
    path: 'administration',
    redirectTo: 'company-list',
  },
  {
    path: 'company-list',
    component: CompanyListComponent,
    canActivate: [HasRoleGuard],
    data: {
      role : "Admin"
    }
  },
  {
    path: 'company-information',
    component: CompanyInformationComponent,
    canActivate: [HasRoleGuard],
    data: {
      role : "Admin"
    }
  },
  { path: 'new-company',
    component: CreateCompany,
    canActivate: [HasRoleGuard],
    data: {
      role: "Admin"
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}

