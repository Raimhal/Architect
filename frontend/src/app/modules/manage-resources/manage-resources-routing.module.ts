import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProjectComponent} from "../project/project.component";
import {ProjectDashboardComponent} from "../project/project-dashboard/project-dashboard.component";
import {ServiceListComponent} from "./service-list/service-list.component";
import {ManageResourcesComponent} from "./manage-resources.component";

const routes : Routes = [
  {path: 'resources', component : ManageResourcesComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageResourcesRoutingModule { }
