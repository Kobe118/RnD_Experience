import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaryPreferenceComponent } from './dietary-preference.component';

describe('DietaryPreferenceComponent', () => {
  let component: DietaryPreferenceComponent;
  let fixture: ComponentFixture<DietaryPreferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietaryPreferenceComponent]
    });
    fixture = TestBed.createComponent(DietaryPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
