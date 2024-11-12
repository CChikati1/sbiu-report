import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailReportComponent } from './retail-report.component';

describe('RetailReportComponent', () => {
  let component: RetailReportComponent;
  let fixture: ComponentFixture<RetailReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetailReportComponent]
    });
    fixture = TestBed.createComponent(RetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
