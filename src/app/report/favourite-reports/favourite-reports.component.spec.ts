import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteReportsComponent } from './favourite-reports.component';

describe('FavouriteReportsComponent', () => {
  let component: FavouriteReportsComponent;
  let fixture: ComponentFixture<FavouriteReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavouriteReportsComponent]
    });
    fixture = TestBed.createComponent(FavouriteReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
