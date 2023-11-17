import {Component, OnInit, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { SupabaseService } from "../../supabase.service";

interface Day {
  image: string;
  weekday: string;
  willAttend: boolean;
  attendees: string[];
}
@Component({
  selector: 'MealPlansHome',
  templateUrl: './meal-plans-home.component.html',
  styleUrls: ['./meal-plans-home.component.scss']
})
export class MealPlansHomeComponent implements OnInit{
  days: any[] = [];

  constructor(private http: HttpClient, private router: Router, private supabaseService: SupabaseService) {}
  ngOnInit(): void {
    this.supabaseService.MealPlansFromFamily('244f4431-3c7b-4e43-9bcd-93d93422e3ef', '2023-11-13').then((data) => {
      this.days = data;
      console.log(this.days);
    });
  }

  navigateToCalender() {
    this.router.navigate(['MealPlansCalender']);
  }

  navigateToAddMealPlan() {
    this.router.navigate(['MealPlansGenerate']);

  }
}
