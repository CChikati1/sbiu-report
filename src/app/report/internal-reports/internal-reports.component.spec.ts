import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalReportsComponent } from './internal-reports.component';

describe('InternalReportsComponent', () => {
  let component: InternalReportsComponent;
  let fixture: ComponentFixture<InternalReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternalReportsComponent]
    });
    fixture = TestBed.createComponent(InternalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
