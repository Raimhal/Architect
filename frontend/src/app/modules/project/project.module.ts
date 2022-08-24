import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromProject from './resources/state/project.reducers'
import { ProjectEffects } from './resources/state/projects.effects';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatTab, MatTabsModule} from '@angular/material/tabs';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { ProjectDescriptionComponent } from './project-description/project-description.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
    MatTabsModule,
    StoreModule.forFeature(
      fromProject.projectFeatureKey,
      fromProject.reducer
    ),
    EffectsModule.forFeature([ProjectEffects]),
    MatTabsModule,
    MatIconModule
  ],
  declarations: [
    ProjectComponent,
    ProjectDashboardComponent,
    ProjectDescriptionComponent
  ]
})
export class ProjectModule { }