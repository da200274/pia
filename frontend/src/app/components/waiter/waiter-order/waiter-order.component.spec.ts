import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterOrderComponent } from './waiter-order.component';

describe('WaiterOrderComponent', () => {
  let component: WaiterOrderComponent;
  let fixture: ComponentFixture<WaiterOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterOrderComponent]
    });
    fixture = TestBed.createComponent(WaiterOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
