import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionFormComponent } from './admission-form.component';

describe('AdmissionFormComponent', () => {
  let component: AdmissionFormComponent;
  let fixture: ComponentFixture<AdmissionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmissionFormComponent]
    });
    fixture = TestBed.createComponent(AdmissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
