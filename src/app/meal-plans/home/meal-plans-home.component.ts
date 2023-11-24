import {Component, OnInit, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { SupabaseService } from "../../supabase.service";

interface Day {
  date: string,
  recipe: string;
  day_of_week: string;
  will_attend: boolean;
  users: User[];
}

interface User {
  user_id: string;
  user_name: string;
}

interface Family {
  is_admin: boolean;
  family_id: string;
  family_name: string;
}
@Component({
  selector: 'MealPlansHome',
  templateUrl: './meal-plans-home.component.html',
  styleUrls: ['./meal-plans-home.component.scss']
})
export class MealPlansHomeComponent implements OnInit{
  days: Day[] = [];
  families: Family[] = [];

  constructor(private http: HttpClient, private router: Router, private supabaseService: SupabaseService) {}
  async ngOnInit(): Promise<void> {
    await this.supabaseService.GetUsersFamilies('afa97aa6-0c65-4db2-996e-2930ef3b9c1c').then((data) => {
        this.families = data[0] as Family[];
  });
    await this.supabaseService.MealPlansFromFamily('244f4431-3c7b-4e43-9bcd-93d93422e3ef', 'afa97aa6-0c65-4db2-996e-2930ef3b9c1c', '2023-11-20').then((data) => {
      this.days = data[0] as Day[];
      console.log('Raw data:', data);

    });console.log('Processed data:', this.days);
  }

  navigateToCalender() {
    this.router.navigate(['MealPlansCalender']);
  }

  navigateToAddMealPlan() {
    this.router.navigate(['MealPlansGenerate']);

  }
}
