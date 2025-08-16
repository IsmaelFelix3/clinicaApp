import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseProcedureComponent } from './close-procedure.component';

describe('CloseProcedureComponent', () => {
  let component: CloseProcedureComponent;
  let fixture: ComponentFixture<CloseProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseProcedureComponent]
    });
    fixture = TestBed.createComponent(CloseProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
