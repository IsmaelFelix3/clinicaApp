import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemsProcedureComponent } from './add-items-procedure.component';

describe('AddItemsProcedureComponent', () => {
  let component: AddItemsProcedureComponent;
  let fixture: ComponentFixture<AddItemsProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddItemsProcedureComponent]
    });
    fixture = TestBed.createComponent(AddItemsProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
