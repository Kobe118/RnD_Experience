import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyModalLeaveComponent } from './family-modal-leave.component';

describe('FamilyModalLeaveComponent', () => {
  let component: FamilyModalLeaveComponent;
  let fixture: ComponentFixture<FamilyModalLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyModalLeaveComponent]
    });
    fixture = TestBed.createComponent(FamilyModalLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
