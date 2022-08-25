import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromProject from './state/project.reducer'
import { ProjectEffects } from './state/project.effects';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatTab, MatTabsModule} from '@angular/material/tabs';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { ProjectDescriptionComponent } from './project-description/project-description.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProjectComponent } from './add-project/add-project.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddProjectPhotosComponent } from './add-project-photos/add-project-photos.component';
import { ImagePipe } from './resources/pipes/imagePipe';
import { IvyCarouselModule } from 'angular-responsive-carousel2';
import { ProjectPhotosComponent } from './project-photos/project-photos.component';
import { MatButtonModule } from '@angular/material/button';
import { NgxDropzoneModule } from 'ngx-dropzone';

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
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    IvyCarouselModule,
    NgxDropzoneModule
  ],
  declarations: [
    ProjectComponent,
    ProjectDashboardComponent,
    ProjectDescriptionComponent,
    AddProjectComponent,
    ProjectPhotosComponent,
    AddProjectPhotosComponent, 
    ImagePipe
  ]
})
export class ProjectModule { }
