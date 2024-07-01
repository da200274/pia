import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCustomerComponent } from './reservation-customer.component';

describe('ReservationCustomerComponent', () => {
  let component: ReservationCustomerComponent;
  let fixture: ComponentFixture<ReservationCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationCustomerComponent]
    });
    fixture = TestBed.createComponent(ReservationCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
