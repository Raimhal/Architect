import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { metaReducers, reducers } from './store';
import { SpinnerEffects } from './store/effects/spinner.effects';
import { AlertEffects } from './store/effects/alert.effects';
import { RouteEffects } from './store/effects/route.effects';
import { ModalEffects } from './store/effects/modal.effects';
import { AuthEffects } from './store/effects/auth.effects';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { MyEntityModule } from './modules/my-entity/my-entity.module';
import { CreateCompany } from './modules/administration/createCompany/createCompany.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { AlertModule } from './modules/alert/alert.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    CreateCompany
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      }
    }),
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    AlertModule,
    MyEntityModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([
      SpinnerEffects,
      AlertEffects,
      RouteEffects,
      ModalEffects
    ]),

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
