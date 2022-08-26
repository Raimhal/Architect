import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProjectDashboardComponent} from "./project-dashboard/project-dashboard.component";
import {IsLoggedInGuard} from "../../core/resources/guards/is-logged-in.guard";
import { ProjectComponent } from './project.component';

const routes : Routes = [
  {path: 'projects', component : ProjectComponent},
  {path: 'project-dashboard/:id', component: ProjectDashboardComponent}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
