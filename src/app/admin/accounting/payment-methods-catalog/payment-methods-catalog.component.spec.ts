import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsCatalogComponent } from './payment-methods-catalog.component';

describe('PaymentMethodsCatalogComponent', () => {
  let component: PaymentMethodsCatalogComponent;
  let fixture: ComponentFixture<PaymentMethodsCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodsCatalogComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
