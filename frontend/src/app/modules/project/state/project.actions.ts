import { Params } from '@angular/router';
import { createAction, props } from '@ngrx/store';
import { PaginationModel } from "src/app/shared/models/pagination-model";
import { HttError } from '../../error/resources/models/httpError';
import { CreateProjectDTO } from '../resources/models/createProjectDTO';
import { IProjectDetailed } from '../resources/models/project-details';
import { IProjectOverview } from '../resources/models/project-overview';
import { IProjectPhoto } from '../resources/models/project-photo.model';
import { IProjectUpdate } from '../resources/models/project-update';
import { ProjectStatus } from '../resources/models/status';
import { IBuilding } from "../resources/models/building.model";
import { IBuildingBlock } from "../resources/models/building-block.model";
import { GetProjectTeamDto } from "../resources/models/get-project-team-dto.model";
import { IProjectDocument } from '../resources/models/project-documents/project-document.model';
import { IProjectDocumentId } from '../resources/models/project-documents/project-document-id.model';
import { IProjectDocumentUpdate } from '../resources/models/project-documents/project-document-update.model';


export const getDetailedProject = createAction(
  '[Project Information Component] Load Detailed Project',
  props<{ id: number }>()
);

export const getDetailedProjectSuccess = createAction(
  '[Project Information Component] Load Detailed Project Success',
  props<{ data: IProjectDetailed }>()
);

export const getDetailedProjectFailure = createAction(
  '[Project Information Component] Load Detailed Project Failure',
  props<{ error: any }>()
);

export const loadDisabledProjectInformationForm = createAction(
  '[Project Information Component] Load Project Information Form'
);

export const editProjectInformationForm = createAction(
  '[Project Information Component] Edit Project Information Form'
);

export const submitProjectInformationForm = createAction(
  '[Project Information Component] Submit Project Information Form',
  props<IProjectUpdate>()
);
export const submitProjectInformationFormSuccess = createAction(
  '[Project Information Component] Submit Project Information Form Success',
  props<{ data: IProjectDetailed }>()
);
export const submitProjectInformationFormFailure = createAction(
  '[Project Information Component] Submit Project Information Form Failure',
  props<{ error: any }>()
);
export const cancelEditProjectInformationForm = createAction(
  '[Project Information Component] Cancel Project Information Form'
);
export const createProject = createAction(
  '[Project] Create Project',
  props<{ project: CreateProjectDTO }>()
);
export const createProjectSuccess = createAction(
  '[Project] Create Project Success'
);
export const createProjectFailure = createAction(
  '[Project] Create Project Failure',
  props<{ error: HttError }>()
);


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

export const loadProjectPhotos = createAction(
  '[Project Photos Component] Load Project Photos',
  props<{ projectId: number }>()
);

export const loadProjectPhotosSuccess = createAction(
  '[Project Photos Component] Load Project Photos Success',
  props<{ data: IProjectPhoto[] }>()
);

export const loadProjectPhotoFailure = createAction(
  '[Project Photos Component] Load Projects Photos Failure',
  props<{ error: any }>()
);

export const deleteProjectPhoto = createAction(
  '[Project Photos Component] Delete Project Photo',
  props<{ projectId: number, photoId: number }>()
);

export const deleteProjectPhotoSuccess = createAction(
  '[Project Photos Component] Delete Project Photos Success',
  props<{ projectId: number, id: number }>()
);

export const deleteProjectPhotoFailure = createAction(
  '[Project Photos Component] Delete Projects Photos Failure',
  props<{ error: any }>()
);

export const uploadProjecPhotoSuccess = createAction(
  '[Add Project Photos Component] Upload Projects Photos Success',
  props<{ id: number }>()
);

export const uploadProjecPhotoFailure = createAction(
  '[Add Project Photos Component] Upload Projects Photos Failure'
);

export const changeProjectStatus = createAction(
  '[Project] Change Project Status',
  props<{ projectId: number, newStatus: ProjectStatus }>()
);

export const changeProjectStatusSuccess = createAction(
  '[Project] change Project Status Success',
  props<{ newStatus: ProjectStatus }>()
);

export const changeProjectStatusFailure = createAction(
  '[Project] change Project Status Failure',
  props<{ error: any }>()
);

export const loadBuildingWithBuildingBlocks = createAction(
  '[Building Section Component] Load Building With Building Blocks',
  props<{ projectId: number }>()
);

export const loadBuildingWithBuildingBlocksSuccess = createAction(
  '[Project Effect] Load Building With Building Blocks Success',
  props<{ result: IBuilding[] }>()
);

export const loadBuildingWithBuildingBlocksFailure = createAction(
  '[Project Effect] Load Building With Building Blocks Failure',
  props<{ error: any }>()
);

export const addNewBuilding = createAction(
  '[Building Section Component] Add New Building',
  props<{ buildingName: string }>()
);

export const addNewBuildingFailure = createAction(
  '[Project Effect] Add New Building Failure',
  props<{ error: any }>()
);

export const addNewBuildingBlock = createAction(
  '[Building Section Component] Add New Building Block',
  props<{ buildingBlock: IBuildingBlock }>()
);

export const addNewBuildingBlockSuccess = createAction(
  '[Project Effect] Add New Building Block Success',
  props<{ result: IBuildingBlock }>()
);

export const addNewBuildingBlockFailure = createAction(
  '[Project Effect] Add New Building Block Failure',
  props<{ error: any }>()
);

export const updateBuilding = createAction(
  '[Building Management Dialog] Update Building',
  props<{ building: IBuilding }>()
);

export const updateBuildingFailure = createAction(
  '[Building Management Dialog] Update Building Failure',
  props<{ error: any }>()
);

export const deleteBuilding = createAction(
  '[Building Management Dialog] Delete Building',
  props<{ id: number }>()
);

export const deleteBuildingFailure = createAction(
  '[Building Management Dialog] Delete Building Failure',
  props<{ error: any }>()
);

export const deleteBuildingBlock = createAction(
  '[Building Management Dialog] Delete Building Block',
  props<{ id: number }>()
);

export const deleteBuildingBlockFailure = createAction(
  '[Building Management Dialog] Delete Building Block Failure',
  props<{ error: any }>()
);

export const updateBuildingBlock = createAction(
  '[Building Management Dialog] Update Building Block',
  props<{ buildingBlock: IBuildingBlock }>()
);

export const updateBuildingBlockFailure = createAction(
  '[Building Management Dialog] Update Building Block Failure',
  props<{ error: any }>()
);

export const revealBuildingCard = createAction(
  '[Building List Item Component] Reveal Building Card',
  props<{ id: number | null }>()
);

export const getProjectTeam = createAction(
  '[Project] Get Project Team',
  props<{ projectId: number }>()
);

export const getProjectTeamSuccess = createAction(
  '[Project] Get Project Team Success',
  props<{ response: GetProjectTeamDto }>()
);

export const getProjectTeamFailure = createAction(
  '[Project] Get Project Team Failure',
  props<{ error: any }>()
);

export const setProjectTeam = createAction(
  '[Project] Set Project Team',
  props<{ projectId: number, userIds: number[] }>()
);

export const setProjectTeamSuccess = createAction(
  '[Project] Set Project Team Success',
);

export const setProjectTeamFailure = createAction(
  '[Project] Set Project Team Failure',
  props<{ error: any }>()
);
export const loadProjectDocuments = createAction(
  '[Project Documents Component] Get Project Documents',
  props<{ projectId: number, query?: string, sort: 'created' | 'id', order?: 1 | 0 }>()
);

export const loadProjectDocumentsSuccess = createAction(
  '[Project Documents Component] Get Project Documents Success',
  props<{ response: IProjectDocument[] }>()
);

export const loadProjectDocumentsFailure = createAction(
  '[Project Documents Component] Get Project Documents Failure',
  props<{ error: any }>()
);

export const deleteProjectDocument = createAction(
  '[Project Document Overview Component] Delete Project Document',
  props<{ projectDocumentId: number }>()
);

export const deleteProjectDocumentSuccess = createAction(
  '[Project Document Overview Component] Delete Project Document Success',
  props<{ response: IProjectDocumentId }>()
);

export const deleteProjectDocumentFailure = createAction(
  '[Project Document Overview Component] Delete Project Document Failure',
  props<{ error: any }>()
);


export const updateProjectDocument = createAction(
  '[Project Document Rename Component] Update Project Document',
  props<{ model: IProjectDocumentUpdate }>()
);

export const updateProjectDocumentSuccess = createAction(
  '[Project Document Rename Component] Update Project Document Success',
  props<{ response: IProjectDocument }>()
);

export const updateProjectDocumentsFailure = createAction(
  '[Project Document Rename Component] Update Project Document Failure',
  props<{ error: any }>()
);

export const uploadProjectDocumentsFailure = createAction(
  '[Project Document Addition Component] Upload Project Documents Failure',
  props<{ error: any }>()
);

