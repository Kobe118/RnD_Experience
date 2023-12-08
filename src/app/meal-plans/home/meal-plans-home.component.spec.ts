import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlansHomeComponent } from './meal-plans-home.component';

describe('MealPlanHomeComponent', () => {
  let component: MealPlansHomeComponent;
  let fixture: ComponentFixture<MealPlansHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealPlansHomeComponent]
    });
    fixture = TestBed.createComponent(MealPlansHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
