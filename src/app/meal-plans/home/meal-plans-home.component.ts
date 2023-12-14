import {Component, OnInit, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NavigationExtras, Router} from '@angular/router';
import { SupabaseService } from "../../services/supabase.service";


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
  mealplans: Day[]
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
    const user = await this.supabaseService.getUserId();
    await this.supabaseService.getUsersFamilies(user.id).then((data) => {
      this.families = data[0] as Family[];
      console.log("check");
    });
    for (const family of this.families) {
      console.log("family_id:", family.family_id);
      console.log("it's in boys!");
      //await this.fetchMealPlansForFamily(user.id, family);
      await this.fetchMealPlansForFamily(user.id, family);
      console.log("check 2");
    }
  }

  private async fetchMealPlansForFamily(userId: string, family: Family): Promise<void> {
    console.log("family_id:", family.family_id, userId)
    console.log("next:", this.getNextMonday());
    try {
      const data = await this.supabaseService.getMealPlansFromFamily(family.family_id, userId, this.getNextMonday());
      console.log("Data received from getMealPlansFromFamily:", data);

      const mealPlansForFamily = data[0] as Day[];

      // Check if mealPlansForFamily is null, and set an empty array if it is
      family.mealplans = mealPlansForFamily || [];

      console.log(`Meal plans for ${family.family_name}:`, family.mealplans);
    } catch (error) {
      console.error("Error fetching meal plans:", error);
    }


  }

  private getNextMonday(): string {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const daysToMonday = currentDayOfWeek === 0 ? 1 : 8 - currentDayOfWeek;
    const nextMondayDate = new Date(currentDate);
    nextMondayDate.setDate(currentDate.getDate() + daysToMonday);

    return nextMondayDate.toISOString().split('T')[0];
  }

  navigateToCalender(family_id:string) {
    console.log("family_id1:", family_id);
    const navigationExtras: NavigationExtras = {
      state: {
        family_id: family_id
      }
    };
    this.router.navigate(['mealplanscalendar'], navigationExtras);
  }

  async navigateToAddMealPlan(family_id:string) {
    const nextMonday = this.getNextMonday();
    console.log(nextMonday);
    await this.supabaseService.createMealPlan(family_id, this.getNextMonday()).then(async (data) => {
      console.log(data);
      this.mealplan = data[0] as MealPlan[];
      console.log("nul???:", this.mealplan);
      if (this.mealplan == null) {
        await this.getMeal(family_id)
      }
      console.log("family_id1:", family_id, this.mealplan);
      const navigationExtras: NavigationExtras = {
        state: {
          family_id: family_id,
          mealplan_id: this.mealplan,
        }
      };
      this.router.navigate(['mealplansgenerating'], navigationExtras);
    });
  }

  async getMeal(family_id: string) {
    await this.supabaseService.getMealPlan(family_id,this.getNextMonday()).then((data) => {
      console.log(data);
      this.mealplan = data[0] as MealPlan[];
      console.log(this.mealplan);
    });
  }

  navigateToGroceryList() {
    this.router.navigate(['grocerylist']);

  }

  handleImageError(day: Day) {
    day.recipe = "\\assets\\default-meal.jpg";
  }

}