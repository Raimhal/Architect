import { Params } from "@angular/router";
import { createReducer, on } from "@ngrx/store";
import { Order } from "../models/order";
import { IProjectOverview } from "../models/project-overview";
import { ProjectStatus } from "../models/status";
import * as ProjectAction from './project.actions';

export const projectFeatureKey = 'project';

export interface State {
  projects: IProjectOverview[],
  params: Params,
  total: number
}
const initialProjectState: State = {
  projects: [],
  params: {
    page: 1,
    count: 10,
    query: "",
    sort: "Id",
    order: Order.ASC,
    status: ProjectStatus.InProcess
  },
  total: 0

}

export const reducer = createReducer(
  initialProjectState,
  on(ProjectAction.getProjectssWithParamsSuccess, (state, action) => {
    return {...state, projects: action.data.list, total: action.data.total}
  }),
  on(ProjectAction.changeParams, (state, action) => {
    return {...state, params: {...state.params, ...action.params}}
  })
);

