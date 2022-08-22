import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";

export interface Option {
  value : any,
  viewValue : string
}


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit {

  @Input() options : Option[] = [];
  @Input() formControl : FormControl = new FormControl();
  @Input() placeholder : string = "";
  @Input() required : boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

}
