import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionProcedureAdminComponent } from './admission-procedure-admin.component';

describe('AdmissionProcedureAdminComponent', () => {
  let component: AdmissionProcedureAdminComponent;
  let fixture: ComponentFixture<AdmissionProcedureAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmissionProcedureAdminComponent]
    });
    fixture = TestBed.createComponent(AdmissionProcedureAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
