import { createAction, props } from "@ngrx/store";
import { PaginationModel } from "src/app/shared/models/pagination-model";
import { Params } from "../models/params";
import { IProjectOverview } from "../models/project-overview";

export const getProjectsWithParams = createAction(
  '[Project List Component] Get Projects With Parameters',
);

export const getProjectssWithParamsSuccess = createAction(
  '[Project List Component] Get Projects With Parameters Success',
  props<{ data: PaginationModel<IProjectOverview> }>()
);

export const getProjectsWithParamsFailure = createAction(
  '[Project List Component] Get Projects With Parameters Failure',
  props<{ error: any }>()
);

export const changeParams = createAction(
  '[Project List Component] Change Projects\' Params',
  props<{ params: Partial<Params> }>()
)