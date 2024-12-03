import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentsReportComponent } from './appoinments-report.component';

describe('AppoinmentsReportComponent', () => {
  let component: AppoinmentsReportComponent;
  let fixture: ComponentFixture<AppoinmentsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppoinmentsReportComponent]
    });
    fixture = TestBed.createComponent(AppoinmentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
