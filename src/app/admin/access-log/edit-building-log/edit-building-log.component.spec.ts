import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBuildingLogComponent } from './edit-building-log.component';

describe('EditBuildingLogComponent', () => {
  let component: EditBuildingLogComponent;
  let fixture: ComponentFixture<EditBuildingLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBuildingLogComponent]
    });
    fixture = TestBed.createComponent(EditBuildingLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
