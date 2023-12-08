import {Component, OnInit, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

interface Day {
  image: string;
  weekday: string;
  willAttend: boolean;
  attendees: string[];
}
@Component({
  selector: 'app-meal-plans-home',
  templateUrl: './meal-plans-home.component.html',
  styleUrls: ['./meal-plans-home.component.scss']
})
export class MealPlansHomeComponent implements OnInit{
  days: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    const url: string = "assets/data.json";
    this.http.get<{ days: Day[] }>(url).subscribe((response: any) => {
      this.days = response.days;
    });
    console.log(this.days)
  }

  navigateToCalender() {
    this.router.navigate(['MealPlansCalender']);
  }

  navigateToAddMealPlan() {
    this.router.navigate(['MealPlansGenerate']);

  }

  navigateToGroceryList() {
    this.router.navigate(['grocery-list']);

  }
}