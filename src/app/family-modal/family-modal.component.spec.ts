import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyModalComponent } from './family-modal.component';

describe('FamilyModalComponent', () => {
  let component: FamilyModalComponent;
  let fixture: ComponentFixture<FamilyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyModalComponent]
    });
    fixture = TestBed.createComponent(FamilyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
