import {Component, OnInit} from '@angular/core';
import {AppState} from "../../../store";
import {select, Store} from "@ngrx/store";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import * as MaterialAction from "./state/material.actions"
import {Observable} from "rxjs";
import {hideMenu, openMenu} from "../../../store/actions/menu.actions";
import {IMaterial} from "./resources/models/material-dto";
import {selectMaterialParams, selectMaterialTypes, selectMeasurement} from "./state/material.selectors";
import {IMaterialType} from "./resources/models/material-type-dto";
import {Params} from "./resources/models/params";
import {Option} from "../../../shared/components/inputs/dropdown/dropdown.component";
import {map} from "rxjs/operators";
import {loadMaterialTypes, loadMeasurement} from "./state/material.actions";

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
  materials$!: Observable<IMaterial>;
  type$: Observable<IMaterialType[]>;
  measurement$: Observable<Option[]> = this.store.pipe(
    select(selectMeasurement),
    map(measurement => measurement == null
      ? []
      : measurement.map<Option>(measurement => ({value: measurement.name, viewValue: measurement.name})))
  );
  displayedColumns: string[] = ['materialType', 'companyName', 'companyAddress', 'measurement', 'amount', 'price', 'totalAmount', 'date', 'action-first'];

  constructor(private store: Store<AppState>,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private activatedRoute: ActivatedRoute) {
    this.matIconRegistry.addSvgIcon(
      'pencil',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/pencil.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'trash',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/trash.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'plus',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/plus.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'cancel',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/Cross.svg')
    );
    this.store.dispatch(openMenu());
    this.store.dispatch(hideMenu());
    this.store.dispatch(MaterialAction.getMaterialWithParams());
    this.store.dispatch(loadMaterialTypes())
    this.store.dispatch(loadMeasurement())
    // this.materials$ = this.store.pipe(select(selectMaterialParams));
    this.type$ = this.store.pipe(select(selectMaterialTypes))
  }

  ngOnInit(): void {

  }
}
