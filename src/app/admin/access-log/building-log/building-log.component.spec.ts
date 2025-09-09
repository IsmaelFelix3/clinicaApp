import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingLogComponent } from './building-log.component';

describe('BuildingLogComponent', () => {
  let component: BuildingLogComponent;
  let fixture: ComponentFixture<BuildingLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingLogComponent]
    });
    fixture = TestBed.createComponent(BuildingLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
