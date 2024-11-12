import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingMallsReportComponent } from './shopping-malls-report.component';

describe('ShoppingMallsReportComponent', () => {
  let component: ShoppingMallsReportComponent;
  let fixture: ComponentFixture<ShoppingMallsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingMallsReportComponent]
    });
    fixture = TestBed.createComponent(ShoppingMallsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
