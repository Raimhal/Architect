import { FormControl, Validators } from '@angular/forms';
import { createFormControlState, FormControlState } from 'ngrx-forms';
import {Component, Input} from '@angular/core';
import {TextInputType} from 'src/app/shared/types/input-types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() control: FormControl | null = null;
  @Input() label: string = ""
  @Input() placeholder: string = ""
  @Input() errorMessage: string = ""
  @Input() type: TextInputType = "text"
  @Input() controlState: FormControlState<any> | null = null;

  get title() {
    return this.control?.invalid && (this.control.touched || this.controlState?.isTouched) ? this.errorMessage : this.label;
  }

}
