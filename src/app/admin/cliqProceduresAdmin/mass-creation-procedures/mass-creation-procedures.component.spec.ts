import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassCreationProceduresComponent } from './mass-creation-procedures.component';

describe('MassCreationProceduresComponent', () => {
  let component: MassCreationProceduresComponent;
  let fixture: ComponentFixture<MassCreationProceduresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MassCreationProceduresComponent]
    });
    fixture = TestBed.createComponent(MassCreationProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
