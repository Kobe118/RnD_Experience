import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyModalAddComponent } from './family-modal-add.component';

describe('FamilyModalFormComponent', () => {
  let component: FamilyModalAddComponent;
  let fixture: ComponentFixture<FamilyModalAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyModalAddComponent]
    });
    fixture = TestBed.createComponent(FamilyModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
