import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdpComponent } from './gdp.component';

describe('GdpComponent', () => {
  let component: GdpComponent;
  let fixture: ComponentFixture<GdpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GdpComponent]
    });
    fixture = TestBed.createComponent(GdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
