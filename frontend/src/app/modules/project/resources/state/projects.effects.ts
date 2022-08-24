import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, map, mergeMap, of, withLatestFrom } from "rxjs";
import { ErrorService } from "src/app/modules/error/resources/services/error.services";
import { AppState } from "src/app/store";
import { ProjectService } from "../services/project.services";
import * as ProjectActions from './project.actions';
import { selectParams } from "./project.selectors";

@Injectable()
export class ProjectEffects {

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private store: Store<AppState>
  ) {}

  getProjectsWithParams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.getProjectsWithParams),
      withLatestFrom(this.store.select(selectParams)),
      concatMap(([_, action]) =>
        this.projectService
          .getProjectsWithParams(action)
          .pipe(
            map((data) =>
              ProjectActions.getProjectssWithParamsSuccess({
                data
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

  changeParams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectActions.changeParams),
      map(() => ProjectActions.getProjectsWithParams())
    );
  });
}