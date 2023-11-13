import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanCalenderComponent } from './meal-plan-calender.component';

describe('MealPlanCalenderComponent', () => {
  let component: MealPlanCalenderComponent;
  let fixture: ComponentFixture<MealPlanCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPlanCalenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealPlanCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
