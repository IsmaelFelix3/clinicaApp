import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcedureDetailsComponent } from './add-procedure-details.component';

describe('AddProcedureDetailsComponent', () => {
  let component: AddProcedureDetailsComponent;
  let fixture: ComponentFixture<AddProcedureDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProcedureDetailsComponent]
    });
    fixture = TestBed.createComponent(AddProcedureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
