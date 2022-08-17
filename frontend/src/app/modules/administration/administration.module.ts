import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCompanyMemberComponent } from './add-company-member/add-company-member.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from "@angular/material/input";
import { StoreModule } from '@ngrx/store';
import * as fromAdministration from './state/administration.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdministrationEffects } from './state/administration.effects';
import {FormsModule} from "@angular/forms";
import {AdministrationApiService} from "./resources/services/administration-api.service";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AddCompanyMemberComponent,

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    StoreModule.forFeature(fromAdministration.administrationFeatureKey, fromAdministration.reducer),
    EffectsModule.forFeature([AdministrationEffects]),
    FormsModule,
    MatIconModule
  ],
  providers: [
    AdministrationApiService
  ]
})
export class AdministrationModule { }
