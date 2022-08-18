import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  opened : boolean = true;
  selectedContent : string = "Companies";

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'caret-left-grey',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/caret-left-grey.svg")
    );
  }

  ngOnInit(): void {
  }

  toggleOpened(){
    this.opened = !this.opened;
  }

}
