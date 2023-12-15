import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import {Family} from "../families/family.model";
import {User} from "../families/user.model";

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {

  currentUser: User = {
    user_id: "",
    last_name: "",
    first_name: "",
    picture_url: ""
  };

  userFamilies: Family[] = [];
  userAdminFamilyId: string | undefined;

  public groceryList: any[] = [];

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async ngOnInit() {
    await this.getFamilies();
    if (this.userAdminFamilyId) {
      const nextMonday = this.getNextMonday(); // Get the next Monday date
      await this.fetchGroceryList(nextMonday); // Pass the date to fetchGroceryList
    }
  }

  async getFamilies() {
    const user = await this.supabaseService.getUserId();
    if (user) {
      this.currentUser.user_id = user.id;
    }

    let { data, error } = await this.supabaseService.supabase
        .rpc('get_all_users_family_members', {
          user_uuid: user.id
        });

    if (error) {
      console.error(error);
    } else {
      this.userFamilies = data.families as Family[];
      console.log(data);
      console.log(this.userFamilies)
    }
    // Find the family where the current user is an admin
    const userAdminFamily = this.userFamilies.find(family => {
      return family.is_admin && family.users.some(u => u.user_id === user.id);
    });

    if (userAdminFamily) {
      this.userAdminFamilyId = userAdminFamily.family_id;
      console.log('Family where user is admin:', userAdminFamily);
    } else {
      console.log('User is not an admin for any family.');
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

  async fetchGroceryList(date: string) {
    try {
      if (typeof this.userAdminFamilyId !== 'undefined') {
        this.groceryList = await this.supabaseService.getIngredientsForWeek(this.userAdminFamilyId, date);
        console.log('date', date);
        console.log('Grocery List:', this.groceryList);
      } else {
        console.log('User is not an admin for any family or family ID is undefined.');
      }
    } catch (error) {
      console.error('Error fetching grocery list:', error);
    }
  }

  goBack(): void {
    this.router.navigate(['/MealPlansHome']); // Replace with the actual route
  }
}
