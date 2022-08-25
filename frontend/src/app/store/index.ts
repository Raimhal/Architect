import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer,
  } from '@ngrx/store';
  import { environment } from '../../environments/environment';
  import * as fromAuth from './reducers/auth.reducer';
  import * as fromRouter from '@ngrx/router-store';
import * as fromMyEntity from '../modules/my-entity/state/my-entity.reducer';
import * as fromAdministration from '../modules/administration/state/administration.reducer';
import * as fromCompany from '../modules/company/state/company.reducer'
import * as fromProject from '../modules/project/resources/state/project.reducers';
import * as fromMenu from './reducers/menu.reducer';

  export interface AppState {
    router: fromRouter.RouterReducerState;
    [fromAuth.authFeatureKey]: fromAuth.State;
    [fromMyEntity.myEntityFeatureKey]: fromMyEntity.State;
    [fromAdministration.administrationFeatureKey]: fromAdministration.State;
    [fromProject.projectFeatureKey]: fromProject.State;
    [fromCompany.companyFeatureKey]: fromCompany.State;
    [fromMenu.menuFeatureKey]: fromMenu.State;
  }

  export const reducers: ActionReducerMap<AppState> = {
    router: fromRouter.routerReducer,
    [fromAuth.authFeatureKey]: fromAuth.reducer,
    [fromMyEntity.myEntityFeatureKey]: fromMyEntity.reducer,
    [fromAdministration.administrationFeatureKey]: fromAdministration.reducer,
    [fromProject.projectFeatureKey]: fromProject.reducer,
    [fromCompany.companyFeatureKey]: fromCompany.reducer,
    [fromMenu.menuFeatureKey]: fromMenu.reducer,
  };

  export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [debug]
    : [];

  export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
      console.log('state', state);
      console.log('action', action);

      return reducer(state, action);
    };
  }
