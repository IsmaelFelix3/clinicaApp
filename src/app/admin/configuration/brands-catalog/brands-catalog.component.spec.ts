import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsCatalogComponent } from './brands-catalog.component';

describe('BrandsCatalogComponent', () => {
  let component: BrandsCatalogComponent;
  let fixture: ComponentFixture<BrandsCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandsCatalogComponent]
    });
    fixture = TestBed.createComponent(BrandsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
