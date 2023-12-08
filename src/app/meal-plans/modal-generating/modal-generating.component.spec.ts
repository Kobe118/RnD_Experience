import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGeneratingComponent } from './modal-generating.component';

describe('ModalGeneratingComponent', () => {
  let component: ModalGeneratingComponent;
  let fixture: ComponentFixture<ModalGeneratingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalGeneratingComponent]
    });
    fixture = TestBed.createComponent(ModalGeneratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
