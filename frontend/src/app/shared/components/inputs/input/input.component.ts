import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TextInputType } from 'src/app/shared/types/input-types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() formControl: FormControl = new FormControl()
  @Input() label: string = ""
  @Input() placeholder: string = ""
  @Input() errorMessage: string = ""
  @Input() type: TextInputType = "text"

  constructor() { }

  ngOnInit(): void {  }

  change() {
  }

  get title() {
    return this.formControl.invalid && this.formControl.touched? this.errorMessage : this.label
  }
  

}
