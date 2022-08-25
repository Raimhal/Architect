import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialogSavecancelComponent } from './modal-dialog-savecancel.component';

describe('ModalDialogSavecancelComponent', () => {
  let component: ModalDialogSavecancelComponent;
  let fixture: ComponentFixture<ModalDialogSavecancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDialogSavecancelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDialogSavecancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
