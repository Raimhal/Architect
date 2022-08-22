import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CompanyListComponent } from "./company-list/company-list.component";
import { CreateCompany } from "./create-company/create-company.component";
import { CompanyInformationComponent } from "./company-information/company-information.component";
import { HasRoleComponent } from "../../shared/components/guards/has-role/has-role.component";

const routes: Routes = [
  {
    path: '',
    component: HasRoleComponent,
    data: {
      requiredRole: 'Admin',
    },
    children: [
      { path: 'administration', redirectTo: 'company-list', },
      { path: 'company-list', component: CompanyListComponent, },
      { path: 'company-information', component: CompanyInformationComponent, },
      { path: 'new-company', component: CreateCompany, },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}
