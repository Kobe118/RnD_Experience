import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NavigationExtras, Router} from '@angular/router';
import {SupabaseService} from "../../services/supabase.service";
import { MealPlan, User, Family, Day } from './meal-plans-home.model';


@Component({
  selector: 'MealPlansHome',
  templateUrl: './meal-plans-home.component.html',
  styleUrls: ['./meal-plans-home.component.scss']
})
export class MealPlansHomeComponent implements OnInit{
  days: Day[] = [];
  families: Family[] = [];
  mealplan: MealPlan[] = [];
  message: string = "";

  constructor(private http: HttpClient, private router: Router, private supabaseService: SupabaseService) {}
  async ngOnInit(): Promise<void> {
    const user = await this.supabaseService.getUserId();
    await this.supabaseService.getUsersFamilies(user.id).then((data) => {
      this.families = data[0] as Family[];
      console.log("check");
    });
    if (this.families == null) {
      this.message = "Please first create or join a family";
    }
    for (const family of this.families) {
      console.log("family_id:", family.family_id);
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

      for (const day of mealPlansForFamily) {
        day.url = await this.getImageUrl(day.recipe);
      }

      for (const day of mealPlansForFamily) {
        day.name = await this.getImageUrl(day.recipe);
      }

      family.mealplans = mealPlansForFamily || [];

      console.log(`Meal plans for ${family.family_name}:`, family.mealplans);
    } catch (error) {
      console.error("Error fetching meal plans:", error);
    }
  }

  async getImageUrl(recipe_id: string) {
    const url = await this.supabaseService.getImageUrl(recipe_id);
    console.log("Image URL for recipe_id", recipe_id, ":", url);
    return url;
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
        family_id: family_id,
      }
    };
    this.router.navigate(['mealplanscalendar'], navigationExtras);
  }

  async navigateToAddMealPlan(family_id:string, family_name:string) {
    const nextMonday = this.getNextMonday();
    console.log(nextMonday);
    await this.supabaseService.createMealPlan(family_id, this.getNextMonday()).then(async (data) => {
      console.log(data);
      this.mealplan = data[0] as MealPlan[];
      console.log("nul???:", this.mealplan);
      if (this.mealplan == null) {
        await this.getMeal(family_id)
      }
      console.log("family_id1:", family_id, this.mealplan, family_name);
      const navigationExtras: NavigationExtras = {
        state: {
          family_id: family_id,
          mealplan_id: this.mealplan,
          family_name: family_name
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
    day.url = "\\assets\\default-meal.jpg";
  }

}