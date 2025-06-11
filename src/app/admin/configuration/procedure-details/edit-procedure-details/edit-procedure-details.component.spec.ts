import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProcedureDetailsComponent } from './edit-procedure-details.component';

describe('EditProcedureDetailsComponent', () => {
  let component: EditProcedureDetailsComponent;
  let fixture: ComponentFixture<EditProcedureDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProcedureDetailsComponent]
    });
    fixture = TestBed.createComponent(EditProcedureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
