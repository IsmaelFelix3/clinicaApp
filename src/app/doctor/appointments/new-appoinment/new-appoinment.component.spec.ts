import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppoinmentComponent } from './new-appoinment.component';

describe('NewAppoinmentComponent', () => {
  let component: NewAppoinmentComponent;
  let fixture: ComponentFixture<NewAppoinmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewAppoinmentComponent]
    });
    fixture = TestBed.createComponent(NewAppoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
