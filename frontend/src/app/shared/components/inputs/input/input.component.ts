import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextInputType } from 'src/app/shared/types/input-types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  // don't rename to formControl
  // why: https://ittutoria.net/question/no-value-accessor-for-form-control-with-unspecified-name-attribute/#comment-19560
  @Input() control = new FormControl()

  @Input() label: string = ""
  @Input() placeholder: string = ""
  @Input() errorMessage: string = ""
  @Input() type: TextInputType = "text"

  get title() {
    return this.control.invalid && this.control.touched ? this.errorMessage : this.label
  }

}
