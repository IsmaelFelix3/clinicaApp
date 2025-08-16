import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksCatalogComponent } from './banks-catalog.component';

describe('BanksCatalogComponent', () => {
  let component: BanksCatalogComponent;
  let fixture: ComponentFixture<BanksCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanksCatalogComponent]
    });
    fixture = TestBed.createComponent(BanksCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
