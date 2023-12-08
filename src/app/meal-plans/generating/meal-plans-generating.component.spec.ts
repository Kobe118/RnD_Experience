import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlansGeneratingComponent } from './meal-plans-generating.component';

describe('MealPlansGeneratingComponent', () => {
  let component: MealPlansGeneratingComponent;
  let fixture: ComponentFixture<MealPlansGeneratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPlansGeneratingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealPlansGeneratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
