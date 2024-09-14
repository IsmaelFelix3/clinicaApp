import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricUnitCatalogComponent } from './metric-unit-catalog.component';

describe('MetricUnitCatalogComponent', () => {
  let component: MetricUnitCatalogComponent;
  let fixture: ComponentFixture<MetricUnitCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetricUnitCatalogComponent]
    });
    fixture = TestBed.createComponent(MetricUnitCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
