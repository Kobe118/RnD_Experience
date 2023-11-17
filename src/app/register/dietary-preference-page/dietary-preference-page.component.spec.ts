import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaryPreferencePageComponent } from './dietary-preference-page.component';

describe('DietaryPreferencePageComponent', () => {
  let component: DietaryPreferencePageComponent;
  let fixture: ComponentFixture<DietaryPreferencePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietaryPreferencePageComponent]
    });
    fixture = TestBed.createComponent(DietaryPreferencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
