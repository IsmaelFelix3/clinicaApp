import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsCatalogComponent } from './labs-catalog.component';

describe('LabsCatalogComponent', () => {
  let component: LabsCatalogComponent;
  let fixture: ComponentFixture<LabsCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabsCatalogComponent]
    });
    fixture = TestBed.createComponent(LabsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
