import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectComponent} from './project.component';
import {ProjectDashboardComponent} from './project-dashboard/project-dashboard.component';
import {ProjectRoutingModule} from './project-routing.module';
import {MatTabsModule} from "@angular/material/tabs";
import {SharedModule} from "../../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import { ProjectDescriptionComponent } from './project-description/project-description.component';
import {MatButtonModule} from "@angular/material/button";
import { StoreModule } from '@ngrx/store';
import * as fromProject from './state/project.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './state/project.effects';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatTabsModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forFeature(fromProject.projectFeatureKey, fromProject.reducer),
    EffectsModule.forFeature([ProjectEffects])
  ],
  declarations: [ProjectComponent, ProjectDashboardComponent, ProjectDescriptionComponent]
})
export class ProjectModule {
}
