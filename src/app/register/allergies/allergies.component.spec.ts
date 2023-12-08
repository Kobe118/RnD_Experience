import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergiesComponent } from './allergies.component';

describe('AllergiesComponent', () => {
  let component: AllergiesComponent;
  let fixture: ComponentFixture<AllergiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllergiesComponent]
    });
    fixture = TestBed.createComponent(AllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
