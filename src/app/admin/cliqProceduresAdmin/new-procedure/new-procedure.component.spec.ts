import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProcedureComponent } from './new-procedure.component';

describe('NewProcedureComponent', () => {
  let component: NewProcedureComponent;
  let fixture: ComponentFixture<NewProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewProcedureComponent]
    });
    fixture = TestBed.createComponent(NewProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
