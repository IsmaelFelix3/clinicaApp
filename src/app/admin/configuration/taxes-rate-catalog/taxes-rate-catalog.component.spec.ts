import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesRateCatalogComponent } from './taxes-rate-catalog.component';

describe('TaxesRateCatalogComponent', () => {
  let component: TaxesRateCatalogComponent;
  let fixture: ComponentFixture<TaxesRateCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxesRateCatalogComponent]
    });
    fixture = TestBed.createComponent(TaxesRateCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
