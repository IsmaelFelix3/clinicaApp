import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersCatalogComponent } from './suppliers-catalog.component';

describe('SuppliersCatalogComponent', () => {
  let component: SuppliersCatalogComponent;
  let fixture: ComponentFixture<SuppliersCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersCatalogComponent]
    });
    fixture = TestBed.createComponent(SuppliersCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
