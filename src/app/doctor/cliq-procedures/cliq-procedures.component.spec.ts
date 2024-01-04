import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliqProceduresComponent } from './cliq-procedures.component';

describe('CliqProceduresComponent', () => {
  let component: CliqProceduresComponent;
  let fixture: ComponentFixture<CliqProceduresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliqProceduresComponent]
    });
    fixture = TestBed.createComponent(CliqProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
