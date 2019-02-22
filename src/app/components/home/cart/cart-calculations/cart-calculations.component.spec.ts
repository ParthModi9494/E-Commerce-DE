import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCalculationsComponent } from './cart-calculations.component';

describe('CartCalculationsComponent', () => {
  let component: CartCalculationsComponent;
  let fixture: ComponentFixture<CartCalculationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartCalculationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
