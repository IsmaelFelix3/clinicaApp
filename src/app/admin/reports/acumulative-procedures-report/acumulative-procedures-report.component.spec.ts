import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcumulativeProceduresReportComponent } from './acumulative-procedures-report.component';

describe('AcumulativeProceduresReportComponent', () => {
  let component: AcumulativeProceduresReportComponent;
  let fixture: ComponentFixture<AcumulativeProceduresReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcumulativeProceduresReportComponent]
    });
    fixture = TestBed.createComponent(AcumulativeProceduresReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
