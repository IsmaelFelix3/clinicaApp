import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCatalogComponent } from './categories-catalog.component';

describe('CategoriesCatalogComponent', () => {
  let component: CategoriesCatalogComponent;
  let fixture: ComponentFixture<CategoriesCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesCatalogComponent]
    });
    fixture = TestBed.createComponent(CategoriesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
