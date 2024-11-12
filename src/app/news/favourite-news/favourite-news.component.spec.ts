import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteNewsComponent } from './favourite-news.component';

describe('FavouriteNewsComponent', () => {
  let component: FavouriteNewsComponent;
  let fixture: ComponentFixture<FavouriteNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavouriteNewsComponent]
    });
    fixture = TestBed.createComponent(FavouriteNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
