import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlansCalendarComponent } from './meal-plans-calendar.component';

describe('MealPlansCalendarComponent', () => {
  let component: MealPlansCalendarComponent;
  let fixture: ComponentFixture<MealPlansCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealPlansCalendarComponent]
    });
    fixture = TestBed.createComponent(MealPlansCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
