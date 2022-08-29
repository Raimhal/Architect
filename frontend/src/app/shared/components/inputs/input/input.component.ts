import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { createFormControlState, FormControlState } from 'ngrx-forms';
import { TextInputType } from 'src/app/shared/types/input-types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() control: FormControl = new FormControl('')
  @Input() label: string = ""
  @Input() placeholder: string = ""
  @Input() errorMessage: string = ""
  @Input() type: TextInputType = "text"

  get title() {
      return this.control.invalid && this.control.touched? this.errorMessage : this.label
  }

}
