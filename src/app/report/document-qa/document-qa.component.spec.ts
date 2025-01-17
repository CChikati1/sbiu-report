import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentQaComponent } from './document-qa.component';

describe('DocumentQaComponent', () => {
  let component: DocumentQaComponent;
  let fixture: ComponentFixture<DocumentQaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentQaComponent]
    });
    fixture = TestBed.createComponent(DocumentQaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
