import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom, mergeMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of, combineLatest } from 'rxjs';
import * as ProjectActions from './project.actions';
import { selectParams, selectProjectInformation } from './project.selectors';
import { serializeError } from 'serialize-error';
import { IProjectUpdate } from '../resources/models/project-update';
import * as ModalDialogAction from '../../../store/actions/modal-dialog.action';
import { ProjectService } from '../resources/services/project.services';
import { ErrorService } from '../../error/resources/services/error.services';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import { selectUserId } from 'src/app/store/selectors/auth.selectors';
import { selectUserDetailsCompanyId } from '../../administration/state/administration.selectors';
import * as fromProjectSelectors from './project.selectors';


@Injectable()
export class ProjectEffects {

  getProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.getDetailedProject),
      concatMap((action) =>
        this.projectService
          .getDetailedProject(action.id)
          .pipe(
            map((data) => 
              ProjectActions.getDetailedProjectSuccess({
                data
              })
            ),
            catchError((error) =>
              of(
                ProjectActions.getDetailedProjectFailure({
                  error: error.error,
                })
              )
            )
          )

      )
    );
  });

  
  submitProjectInformationFormState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.submitProjectInformationForm),
      switchMap((project) => {
        return this.projectService
          .putDetailedProject({
            id: project.id,
            address: project.address,
            startTime: project.startTime,
            endTime: project.endTime
          } as IProjectUpdate)
          .pipe(
            map((data) => ProjectActions.getDetailedProject({id: data.id})),
            catchError((error) =>
              of(
                ProjectActions.submitProjectInformationFormFailure({
                  error: serializeError(error),
                })
              )
            )
          );
      })
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
              ProjectActions.loadProjectPhotoFailure({
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

  changeProjectStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.changeProjectStatus),
      concatMap((action) =>
        this.projectService.changeStatus(action.projectId, action.newStatus).pipe(
          map(() => ProjectActions.changeProjectStatusSuccess({ newStatus: action.newStatus })),
          catchError((error: any) =>
            of(ProjectActions.changeProjectStatusFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private errorService: ErrorService,
    private store: Store<AppState>,
  ) { }
}
