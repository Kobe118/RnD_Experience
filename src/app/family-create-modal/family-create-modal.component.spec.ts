import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyCreateModalComponent } from './family-create-modal.component';

describe('FamilyCreateModalComponent', () => {
  let component: FamilyCreateModalComponent;
  let fixture: ComponentFixture<FamilyCreateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyCreateModalComponent]
    });
    fixture = TestBed.createComponent(FamilyCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
