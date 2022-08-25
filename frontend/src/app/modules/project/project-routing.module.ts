import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectComponent } from './project.component';

const routes : Routes = [
  {path: 'project-dashboard', component: ProjectDashboardComponent},
  {path: 'projects', component: ProjectComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
