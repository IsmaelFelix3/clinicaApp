import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalAppoinmentComponent } from './historical-appoinment.component';

describe('HistoricalAppoinmentComponent', () => {
  let component: HistoricalAppoinmentComponent;
  let fixture: ComponentFixture<HistoricalAppoinmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricalAppoinmentComponent]
    });
    fixture = TestBed.createComponent(HistoricalAppoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
