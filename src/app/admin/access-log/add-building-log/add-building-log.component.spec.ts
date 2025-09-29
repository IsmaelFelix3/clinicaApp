import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBuildingLogComponent } from './add-building-log.component';

describe('AddBuildingLogComponent', () => {
  let component: AddBuildingLogComponent;
  let fixture: ComponentFixture<AddBuildingLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBuildingLogComponent]
    });
    fixture = TestBed.createComponent(AddBuildingLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
