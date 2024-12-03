import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientDoctorComponent } from './add-patient-doctor.component';

describe('AddPatientDoctorComponent', () => {
  let component: AddPatientDoctorComponent;
  let fixture: ComponentFixture<AddPatientDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPatientDoctorComponent]
    });
    fixture = TestBed.createComponent(AddPatientDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
