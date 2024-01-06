import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarProceduresComponent } from './calendar-procedures.component';

describe('CalendarProceduresComponent', () => {
  let component: CalendarProceduresComponent;
  let fixture: ComponentFixture<CalendarProceduresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarProceduresComponent]
    });
    fixture = TestBed.createComponent(CalendarProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
