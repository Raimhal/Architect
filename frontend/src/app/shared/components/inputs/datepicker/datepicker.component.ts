import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {DatepickerHeaderComponent} from "./datepicker-header/datepicker-header.component";
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM'
  }
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatepickerComponent implements OnInit {

  datepickerHeader = DatepickerHeaderComponent;

  @Input() placeholder : string = ""
  @Input() control : FormControl = new FormControl('');

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    return 'example-custom-date-class';
  };

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,) {
    this.matIconRegistry.addSvgIcon(
      'calendar',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/calendar.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'calendar-picked',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/calendar-picked.svg")
    )
  }

  ngOnInit(): void {

  }

}
