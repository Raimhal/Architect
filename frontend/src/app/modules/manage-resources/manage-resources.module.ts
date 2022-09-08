import {NgModule} from "@angular/core";
import {ManageResourcesComponent} from "./manage-resources.component";
import {MaterialComponent} from './material/material.component';
import {ManageResourcesRoutingModule} from "./manage-resources-routing";
import {MatTabsModule} from "@angular/material/tabs";
import {MaterialApiService} from "./material/resources/services/material-api.service";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import * as fromMaterials from './material/state/material.reducer'
import {MaterialEffects} from "./material/state/material.effects";
import {CommonModule} from '@angular/common';
import {ServiceListComponent} from './service-list/service-list.component';
import {MatTableModule} from '@angular/material/table';
import {SharedModule} from "../../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgrxFormsModule} from "ngrx-forms";
import {ReactiveFormsModule} from "@angular/forms";
import * as fromManagment from "./state/manage-resources.reducer";
import {ManageResourcesEffects} from "./state/manage-resources.effects";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  imports: [
    ManageResourcesRoutingModule,
    EffectsModule.forFeature([MaterialEffects]),
    CommonModule,
    MatTabsModule,
    MatTableModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    NgrxFormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    StoreModule.forFeature(
      fromManagment.manageResourcesFeatureKey,
      fromManagment.reducer
    ),
    EffectsModule.forFeature([ManageResourcesEffects]),
    NgxSpinnerModule
  ],
  declarations: [
    ManageResourcesComponent,
    MaterialComponent,
    ServiceListComponent
  ],
  exports: [
    ServiceListComponent,
    ManageResourcesComponent
  ],
  providers: [MaterialApiService],

})

export class ManageResourcesModule {
}
