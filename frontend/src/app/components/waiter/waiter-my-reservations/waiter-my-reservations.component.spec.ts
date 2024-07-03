import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterMyReservationsComponent } from './waiter-my-reservations.component';

describe('WaiterMyReservationsComponent', () => {
  let component: WaiterMyReservationsComponent;
  let fixture: ComponentFixture<WaiterMyReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterMyReservationsComponent]
    });
    fixture = TestBed.createComponent(WaiterMyReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
