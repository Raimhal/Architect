import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { EffectsModule } from '@ngrx/effects';
import { CompanyEffects } from './state/company.effects';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MatIconModule,
    MatButtonModule,
    EffectsModule.forFeature([CompanyEffects]),
    SharedModule
  ]
})
export class CompanyModule { }
