import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {AddCompanyMemberComponent} from './add-company-member/add-company-member.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {StoreModule} from '@ngrx/store';
import * as fromAdministration from './state/administration.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AdministrationEffects} from './state/administration.effects';
import {MatIconModule} from "@angular/material/icon";
import {CompanyListComponent} from './company-list/company-list.component';
import {AdministrationApiService} from "./resources/services/administration-api.service";
import {MatMenuModule} from "@angular/material/menu";
import {CompanyOverviewComponent} from './company-overview/company-overview.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AdministrationRoutingModule} from './administration-routing.module';
import {FormsModule} from "@angular/forms";
import {CompanyInformationComponent} from './company-information/company-information.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCardModule} from '@angular/material/card';
import { NgrxFormsModule } from 'ngrx-forms';

@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyOverviewComponent,
    AddCompanyMemberComponent,
    CompanyInformationComponent
  ],
  exports: [
    CompanyInformationComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    StoreModule.forFeature(fromAdministration.administrationFeatureKey, fromAdministration.reducer),
    EffectsModule.forFeature([AdministrationEffects]),
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    AdministrationRoutingModule,
    FormsModule,
    MatIconModule,
    ScrollingModule,
    MatCardModule,
    NgrxFormsModule
  ],
  providers: [
    AdministrationApiService
  ]
})
export class AdministrationModule {
}
