import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ProjectStatus } from 'src/app/modules/project/resources/models/status';

export interface CardInformation {
  title : string;
  image : string;
  date : string;
  subtitle : string;
  id: number | null;
  status: ProjectStatus | null;
  statusBarLabel: string | null
  statusBarProgress: number | null;
  statusBarFull: number 
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  numOfProgressBarSections = 8;


  @Input() cardId :number =0
  @Input() cardInformation : CardInformation = {
    title : '',
    image: '',
    date: '',
    subtitle: '',
    id: null,
    status: null,
    statusBarLabel: null,
    statusBarProgress: null,
    statusBarFull: 0
  }

  @Output() onCardClicked = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onClicked() {
    this.onCardClicked.emit(this.cardId);
  }

  get _dummyArray() {
    return Array.from({length: this.cardInformation.statusBarFull}).map((_, i) => i);
  }
}
