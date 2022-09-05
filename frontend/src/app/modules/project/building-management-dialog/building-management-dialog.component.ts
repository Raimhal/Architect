import {Component, Inject, Input, OnInit} from '@angular/core';
import {IBuilding} from "../resources/models/building.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Form, FormControl, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store";
import {
  addNewBuildingBlock,
  deleteBuilding,
  deleteBuildingBlock,
  updateBuilding,
  updateBuildingBlock
} from "../state/project.actions";
import {closeModalDialog, openModalDialog} from "../../../store/actions/modal-dialog.action";
import {selectProjectBuildings} from "../state/project.selectors";
import {filter, first, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {IBuildingBlock} from "../resources/models/building-block.model";
import { ProjectDocumentAdditionComponent } from '../projectDocuments/project-document-addition/project-document-addition.component';

class DialogData {
}

@Component({
  selector: 'app-building-management-dialog',
  templateUrl: './building-management-dialog.component.html',
  styleUrls: ['./building-management-dialog.component.scss']
})
export class BuildingManagementDialogComponent implements OnInit {

  building$: Observable<IBuilding | undefined>
  buildingName: FormControl = new FormControl
  isMouseOverSubsectionListItem: boolean = false;
  isEditing: boolean = false;

  isAdding: boolean = false;
  buildingBlockName: FormControl = new FormControl('', [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private store: Store<AppState>) {
    this.building$ = this.store.pipe(
      select(selectProjectBuildings),
      map(buildings => buildings.find(b => b.id == data as number))
    );

  }

  ngOnInit(): void {
  }

  onSubmit(building: IBuilding) {
    if (!this.buildingName?.valid) {
      return;
    }
    building = {
      ...building,
      buildingName: this.buildingName.value
    }
    this.store.dispatch(updateBuilding({building: building}));
    this.isEditing = false;
  }

  onDelete(id: number) {
    this.store.dispatch(deleteBuilding({id: id}));
    this.store.dispatch(closeModalDialog());
  }

  onEdit(buildingName: string) {
    this.isEditing = true;
    this.buildingName = new FormControl(buildingName, [Validators.required]);
  }

  onSubmitAdding(buildingBlockString: string, id: number) {
    this.store.dispatch(addNewBuildingBlock({
      buildingBlock: {
        buildingBlockName: buildingBlockString,
        isDone: false,
        buildingId: id
      } as IBuildingBlock
    }));
    this.isAdding = false;
  }

  deleteSubsection(id: number) {
    this.store.dispatch(deleteBuildingBlock({id:id}));
  }

  editBuildingBlock(checked: boolean, buildingBlock: IBuildingBlock) {
    this.store.dispatch(updateBuildingBlock({
      buildingBlock: {
        ...buildingBlock,
        isDone: checked
      }
    }))
  }

  onAddDocuments(buildingId: number){
    this.store.dispatch(closeModalDialog());
    this.store.dispatch(openModalDialog({component: ProjectDocumentAdditionComponent, config:{
      data: buildingId
    }}))
  }
}
