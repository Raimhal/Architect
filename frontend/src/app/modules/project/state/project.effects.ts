import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom } from 'rxjs/operators';
import { Observable, EMPTY, of, combineLatest } from 'rxjs';
import * as ProjectActions from './project.actions';
import * as ModalDialogAction from '../../../store/actions/modal-dialog.action';
import { ProjectService } from '../resources/services/project.services';
import { ErrorService } from '../../error/resources/services/error.services';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import { selectUserId } from 'src/app/store/selectors/auth.selectors';
import { selectUserDetailsCompanyId } from '../../administration/state/administration.selectors';


@Injectable()
export class ProjectEffects {

  loadProjects$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ProjectActions.loadProjects),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => ProjectActions.loadProjectsSuccess({ data })),
          catchError(error => of(ProjectActions.loadProjectsFailure({ error }))))
      )
    );
  });
  crateProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.crateProject),
      withLatestFrom(    
        this.store.select(selectUserDetailsCompanyId),        
        this.store.select(selectUserId),
      ),     
      concatMap(([action, userId,companyId]) =>
        this.projectService.createProject({ ...action.project, userId: userId!, companyId: companyId! })
          .pipe(
            map(() => ProjectActions.crateProjectSuccess()),
            catchError((error: HttpErrorResponse) =>
              of(ProjectActions.loadProjectsFailure({ error: this.errorService.getErrorMessage(error.error, "Create project is failure") })))
          )
      )
    );
  });

  effectName$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ProjectActions.crateProjectSuccess),
        map(() => ModalDialogAction.closeModalDialog()),
    );
  });


  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private errorService: ErrorService,
    private store: Store<AppState>) { }
}
