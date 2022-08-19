import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordButtonComponent } from './forgot-password-button.component';

describe('ForgotPasswordButtonComponent', () => {
  let component: ForgotPasswordButtonComponent;
  let fixture: ComponentFixture<ForgotPasswordButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
