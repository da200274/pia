import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVisitorComponent } from './header-visitor.component';

describe('HeaderVisitorComponent', () => {
  let component: HeaderVisitorComponent;
  let fixture: ComponentFixture<HeaderVisitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderVisitorComponent]
    });
    fixture = TestBed.createComponent(HeaderVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
