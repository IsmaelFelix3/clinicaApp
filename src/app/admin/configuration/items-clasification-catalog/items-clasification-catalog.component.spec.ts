import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsClasificationCatalogComponent } from './items-clasification-catalog.component';

describe('ItemsClasificationCatalogComponent', () => {
  let component: ItemsClasificationCatalogComponent;
  let fixture: ComponentFixture<ItemsClasificationCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsClasificationCatalogComponent]
    });
    fixture = TestBed.createComponent(ItemsClasificationCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
