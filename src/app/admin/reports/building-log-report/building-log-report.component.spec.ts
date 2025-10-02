import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingLogReportComponent } from './building-log-report.component';

describe('BuildingLogReportComponent', () => {
  let component: BuildingLogReportComponent;
  let fixture: ComponentFixture<BuildingLogReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingLogReportComponent]
    });
    fixture = TestBed.createComponent(BuildingLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
