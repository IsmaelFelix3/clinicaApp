import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAppoinmentsComponent } from './all-appoinments.component';

describe('AllAppoinmentsComponent', () => {
  let component: AllAppoinmentsComponent;
  let fixture: ComponentFixture<AllAppoinmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAppoinmentsComponent]
    });
    fixture = TestBed.createComponent(AllAppoinmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
