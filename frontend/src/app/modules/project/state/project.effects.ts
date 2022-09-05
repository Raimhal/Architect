import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, concatMap, withLatestFrom, mergeMap, switchMap} from 'rxjs/operators';
import {Observable, EMPTY, of, combineLatest} from 'rxjs';
import * as ProjectActions from './project.actions';
import {selectCurrentProjectId, selectParams, selectProjectInformation} from './project.selectors';
import {serializeError} from 'serialize-error';
import {IProjectUpdate} from '../resources/models/project-update';
import * as ModalDialogAction from '../../../store/actions/modal-dialog.action';
import {ProjectService} from '../resources/services/project.services';
import {ErrorService} from '../../error/resources/services/error.services';
import {HttpErrorResponse} from '@angular/common/http';
import {AppState} from 'src/app/store';
import {select, Store} from '@ngrx/store';
import {selectUserId} from 'src/app/store/selectors/auth.selectors';
import {selectUserDetailsCompanyId} from '../../administration/state/administration.selectors';
import * as fromProjectSelectors from './project.selectors';
import {BuildingApiService} from "../resources/services/building-api.service";
import {IBuilding} from "../resources/models/building.model";


@Injectable()
export class ProjectEffects {

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
            map((data) => ProjectActions.getDetailedProject({ id: data.id })),
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

  uploadProjectPhotoSuccess$ = createEffect(() => {
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
          map(() => ProjectActions.changeProjectStatusSuccess({newStatus: action.newStatus})),
          catchError((error: any) =>
            of(ProjectActions.changeProjectStatusFailure({error}))
          )
        )
      )
    );
  });

  getProjectSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.getDetailedProjectSuccess,
        ProjectActions.submitProjectInformationFormFailure,
        ProjectActions.cancelEditProjectInformationForm),
      map(() => ProjectActions.loadDisabledProjectInformationForm())
    );
  });

  initiallyLoadBuildings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.getDetailedProjectSuccess),
      map((action) => ProjectActions.loadBuildingWithBuildingBlocks({projectId: action.data.id}))
    ))

  loadBuildings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadBuildingWithBuildingBlocks),
      concatMap((action) =>
        this.buildingService.getBuildingsByProjectId(action.projectId).pipe(
          map(result => ProjectActions.loadBuildingWithBuildingBlocksSuccess({result: result})),
          catchError(error => of(ProjectActions.loadBuildingWithBuildingBlocksFailure({error: serializeError(error)})))
        ))
    ))

  addNewBuilding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.addNewBuilding),
      withLatestFrom(this.store.pipe(select(selectCurrentProjectId))),
      concatMap(([action, id]) =>
        this.buildingService.addBuilding({buildingName: action.buildingName, projectId: id} as IBuilding)
          .pipe(
            map(() => ProjectActions.loadBuildingWithBuildingBlocks({projectId: id!})),
            catchError((error) => of(ProjectActions.addNewBuildingFailure({error: serializeError(error)})))
          ))
    ));

  updateBuilding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.updateBuilding),
      withLatestFrom(this.store.pipe(select(selectCurrentProjectId))),
      concatMap(([action, id]) =>
        this.buildingService.updateBuilding(action.building).pipe(
          map(() => ProjectActions.loadBuildingWithBuildingBlocks({projectId: id!})),
          catchError((error) => of(ProjectActions.updateBuildingFailure({error: serializeError(error)})))
        )
      )
    )
  );

  deleteBuilding$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.deleteBuilding),
      withLatestFrom(this.store.pipe(select(selectCurrentProjectId))),
      concatMap(([action, projectId]) =>
        this.buildingService.deleteBuilding(action.id).pipe(
          map(() => ProjectActions.loadBuildingWithBuildingBlocks({projectId: projectId!})),
          catchError((error) => of(ProjectActions.deleteBuildingFailure({error: serializeError(error)})))
        )
      )
    )
  );

  addBuildingBlock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.addNewBuildingBlock),
      withLatestFrom(this.store.pipe(select(selectCurrentProjectId))),
      concatMap(([action, id]) =>
        this.buildingService.addBuildingBlock(action.buildingBlock).pipe(
          map(() => ProjectActions.loadBuildingWithBuildingBlocks({projectId: id!})),
          catchError((error) => of(ProjectActions.addNewBuildingFailure({error: serializeError(error)})))
        )
      )
    )
  );

  deleteBuildingBlock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.deleteBuildingBlock),
      withLatestFrom(this.store.pipe(select(selectCurrentProjectId))),
      concatMap(([action, id]) =>
        this.buildingService.deleteBuildingBlock(action.id).pipe(
          map(() => ProjectActions.loadBuildingWithBuildingBlocks({projectId: id!})),
          catchError((error) => of(ProjectActions.deleteBuildingBlockFailure({error: serializeError(error)})))
        )
      )
    )
  );

  updateBuildingBlock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.updateBuildingBlock),
      withLatestFrom(this.store.pipe(select(selectCurrentProjectId))),
      concatMap(([action, id]) =>
        this.buildingService.updateBuildingBlock(action.buildingBlock).pipe(
          map(() => ProjectActions.loadBuildingWithBuildingBlocks({projectId: id!})),
          catchError((error) => of(ProjectActions.updateBuildingBlockFailure({error: serializeError(error)})))
        )
      )
    )
  );

  getProjectTeam$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.getProjectTeam),
      concatMap((action) =>
        this.projectService.getProjectTeam(action.projectId).pipe(
          map(response => ProjectActions.getProjectTeamSuccess({ response  })),
          catchError((error: any) =>
            of(ProjectActions.getProjectTeamFailure({ error }))
          )
        )
      )
    );
  });

  setProjectTeam$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.setProjectTeam),
      concatMap((action) =>
        this.projectService.setProjectTeam(action.projectId, action.userIds).pipe(
          map(response => {
            this.store.dispatch(ProjectActions.getProjectTeam({ projectId: action.projectId }));
            return ProjectActions.setProjectTeamSuccess();
          }),
          catchError((error: any) =>
            of(ProjectActions.setProjectTeamFailure({ error }))
          )
        )
      )
    );
  });

  loadProjectDocuments$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ProjectActions.loadProjectDocuments),
      concatMap((action)=>
        this.projectService.getProjectDocuments(action.projectId, action.sort, action.query, action.order).pipe(
          map(result=>
            ProjectActions.loadProjectDocumentsSuccess({response: result})
          ),
          catchError((error:any)=>
            of(ProjectActions.loadProjectDocumentsFailure({error: serializeError(error)}))
          )
        )
      )
    );
  })

  deleteProjectDocument$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ProjectActions.deleteProjectDocument),
      concatMap((action)=>
        this.projectService.deleteProjectDocument(action.projectDocumentId).pipe(
          map(result=>
            ProjectActions.deleteProjectDocumentSuccess({response: result})
          ),
          catchError((error:any)=>
            of(ProjectActions.deleteProjectDocumentFailure({error: serializeError(error)}))
          )
        )
      )
    );
  })

  updateProjectDocument$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(ProjectActions.updateProjectDocument),
      concatMap((action)=>
        this.projectService.updateProjectDocument(action.model).pipe(
          switchMap(result=>of(
            ProjectActions.updateProjectDocumentSuccess({response: result}),
            ModalDialogAction.closeModalDialog()
          )
          ),
          catchError((error:any)=>
            of(ProjectActions.updateProjectDocumentsFailure({error: serializeError(error)}))
          )
        )
      )
    );
  })
  
  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private errorService: ErrorService,
    private store: Store<AppState>,
    private buildingService: BuildingApiService
  ) {
  }
}
