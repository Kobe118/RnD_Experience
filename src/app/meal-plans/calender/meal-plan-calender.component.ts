import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

interface Day {
  date: Date;
  clicked: boolean;
}
@Component({
  selector: 'app-meal-plan-calender',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-plan-calender.component.html',
  styleUrl: './meal-plan-calender.component.scss'
})
export class MealPlanCalenderComponent {
  dates: Day[] = [
    { date: new Date(2023, 0, 1), clicked: false },
    { date: new Date(2023, 0, 2), clicked: true },
    { date: new Date(2023, 0, 3), clicked: true },
    { date: new Date(2023, 0, 4), clicked: false },
    { date: new Date(2023, 0, 5), clicked: false },
    { date: new Date(2023, 0, 6), clicked: false },
    { date: new Date(2023, 0, 7), clicked: true },
    { date: new Date(2023, 0, 8), clicked: false },
  ];

  constructor(private router: Router) {}

  isDateClicked(date: Day): boolean {
    return date.clicked;
  }

  onDateClick(date: Day): void {
    date.clicked = !date.clicked;
  }

  goBack(): void {
    this.router.navigate(['/MealPlansHome']); // Replace with the actual route
  }

  ngOnInit(): void {}
}
