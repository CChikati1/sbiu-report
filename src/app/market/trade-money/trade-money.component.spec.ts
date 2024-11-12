import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeMoneyComponent } from './trade-money.component';

describe('TradeMoneyComponent', () => {
  let component: TradeMoneyComponent;
  let fixture: ComponentFixture<TradeMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TradeMoneyComponent]
    });
    fixture = TestBed.createComponent(TradeMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
