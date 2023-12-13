import {Component, OnInit, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NavigationExtras, Router} from '@angular/router';
import {SupabaseService} from "../../supabase.service";

interface Day {
  date: string;
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

interface MealPlan {
  mealplan: string;
}
@Component({
  selector: 'MealPlansHome',
  templateUrl: './meal-plans-home.component.html',
  styleUrls: ['./meal-plans-home.component.scss']
})
export class MealPlansHomeComponent implements OnInit{
  days: Day[] = [];
  families: Family[] = [];
  mealplan: MealPlan[] = [];

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

  private getNextMonday(): string {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const daysToMonday = currentDayOfWeek === 0 ? 1 : 8 - currentDayOfWeek;
    const nextMondayDate = new Date(currentDate);
    nextMondayDate.setDate(currentDate.getDate() + daysToMonday);

    return nextMondayDate.toISOString().split('T')[0];
  }

  navigateToCalender(family_id:String) {
    console.log("family_id1:", family_id);
    const navigationExtras: NavigationExtras = {
      state: {
        family_id: family_id
      }
    };
    this.router.navigate(['mealplanscalendar'], navigationExtras);
  }

  async navigateToAddMealPlan() {
    const nextMonday = this.getNextMonday();
    console.log(nextMonday);
    await this.supabaseService.CreateMealPlan('244f4431-3c7b-4e43-9bcd-93d93422e3ef', '2023-12-11').then((data) => {
      console.log(data);
      this.mealplan = data[0] as MealPlan[];
      if (this.mealplan == null) {
        this.supabaseService.GetMealPlan('244f4431-3c7b-4e43-9bcd-93d93422e3ef','2023-12-11').then((data) => {
          console.log(data);
          this.mealplan = data[0] as MealPlan[];
        });
      }
      this.router.navigate(['mealplansgenerating']);
    });

  }

  navigateToGroceryList() {
    this.router.navigate(['grocerylist']);

  }
}