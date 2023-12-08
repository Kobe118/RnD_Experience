import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlansCalenderComponent } from './meal-plans-calender.component';

describe('MealPlanCalenderComponent', () => {
  let component: MealPlansCalenderComponent;
  let fixture: ComponentFixture<MealPlansCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPlansCalenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealPlansCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
