import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesCatalogComponent } from './specialties-catalog.component';

describe('SpecialtiesCatalogComponent', () => {
  let component: SpecialtiesCatalogComponent;
  let fixture: ComponentFixture<SpecialtiesCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialtiesCatalogComponent]
    });
    fixture = TestBed.createComponent(SpecialtiesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
