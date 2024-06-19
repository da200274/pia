import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCustomerComponent } from './delivery-customer.component';

describe('DeliveryCustomerComponent', () => {
  let component: DeliveryCustomerComponent;
  let fixture: ComponentFixture<DeliveryCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryCustomerComponent]
    });
    fixture = TestBed.createComponent(DeliveryCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
