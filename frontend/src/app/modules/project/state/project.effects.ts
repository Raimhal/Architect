import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom, mergeMap } from 'rxjs/operators';
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
import { serializeError } from 'serialize-error';
import * as fromProjectSelectors from './project.selectors';


@Injectable()
export class ProjectEffects {
  loadProjects$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ProjectActions.loadProjects),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map((data) => ProjectActions.loadProjectsSuccess({ data })),
          catchError((error) =>
            of(ProjectActions.loadProjectsFailure({ error }))
          )
        )
      )
    );
  });

  loadProjectPhotos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.loadProjectPhotos),
      mergeMap((action) =>
        this.projectService.getProjectPhotos(action.projectId).pipe(
          map((result) =>
            ProjectActions.loadProjectPhotosSuccess({
              data: result,
            })
          ),
          catchError((error) =>
            of(
              ProjectActions.loadProjectsFailure({
                error: serializeError(error),
              })
            )
          )
        )
      )
    );
  });

  deleteProjectPhoto$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.deleteProjectPhoto),
      mergeMap((action) =>
        this.projectService
          .deleteProjectPhoto(action.projectId, action.photoId)
          .pipe(
            map((serviceResult) =>
              ProjectActions.deleteProjectPhotoSuccess({
                projectId: serviceResult.projectId,
                id: serviceResult.id,
              })
            ),
            catchError((error) =>
              of(
                ProjectActions.loadProjectPhotoFailure({
                  error: serializeError(error),
                })
              )
            )
          )
      )
    );
  });

  getProjectsWithParams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.getProjectsWithParams),
      withLatestFrom(this.store.select(fromProjectSelectors.selectParams)),
      concatMap(([_, action]) =>
        this.projectService.getProjectsWithParams(action).pipe(
          map((data) =>
            ProjectActions.getProjectssWithParamsSuccess({
              data,
            })
          ),
          catchError((error) =>
            of(
              ProjectActions.getProjectsWithParamsFailure({
                error: error.error,
              })
            )
          )
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

  uploadProjectPhotoSuccess$ =  createEffect(() => {
    return this.actions$.pipe(
        ofType(ProjectActions.uploadProjecPhotoSuccess),
        map((action) => ProjectActions.loadProjectPhotos({projectId: action.id})),
    );
  });

  changeParams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.changeParams),
      map(() => ProjectActions.getProjectsWithParams())
    );
  });

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private errorService: ErrorService,
    private store: Store<AppState>) { }
}
