import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergiesPageComponent } from './allergies-page.component';

describe('AllergiesPageComponent', () => {
  let component: AllergiesPageComponent;
  let fixture: ComponentFixture<AllergiesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllergiesPageComponent]
    });
    fixture = TestBed.createComponent(AllergiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
