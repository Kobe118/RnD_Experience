import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogINComponent } from './log-in.component';

describe('LogINComponent', () => {
  let component: LogINComponent;
  let fixture: ComponentFixture<LogINComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogINComponent]
    });
    fixture = TestBed.createComponent(LogINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
