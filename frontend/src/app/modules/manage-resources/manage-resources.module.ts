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

@NgModule({
  imports: [
    ManageResourcesRoutingModule,
    MatTabsModule,
    StoreModule.forFeature(
      fromMaterials.manageResourceFeatureKey,
      fromMaterials.reducer
    ),
    EffectsModule.forFeature([MaterialEffects]),
  ],
  declarations: [
    ManageResourcesComponent,
    MaterialComponent,
  ],
  providers: [MaterialApiService],

})

export class ManageResourcesModule {
}
