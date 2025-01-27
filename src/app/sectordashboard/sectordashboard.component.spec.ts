import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectordashboardComponent } from './sectordashboard.component';

describe('SectordashboardComponent', () => {
  let component: SectordashboardComponent;
  let fixture: ComponentFixture<SectordashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectordashboardComponent]
    });
    fixture = TestBed.createComponent(SectordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
