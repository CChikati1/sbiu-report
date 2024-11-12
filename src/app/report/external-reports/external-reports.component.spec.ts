import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalReportsComponent } from './external-reports.component';

describe('ExternalReportsComponent', () => {
  let component: ExternalReportsComponent;
  let fixture: ComponentFixture<ExternalReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExternalReportsComponent]
    });
    fixture = TestBed.createComponent(ExternalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
