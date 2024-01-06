import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentProceduresComponent } from './current-procedures.component';

describe('CurrentProceduresComponent', () => {
  let component: CurrentProceduresComponent;
  let fixture: ComponentFixture<CurrentProceduresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentProceduresComponent]
    });
    fixture = TestBed.createComponent(CurrentProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
