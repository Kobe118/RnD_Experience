import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {

  groceryList: any[] = [];
  family : string;
  week : string;

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async ngOnInit() {
    await this.fetchGroceryList();
  }

  async fetchGroceryList() {
    try {
      this.groceryList = await this.supabaseService.getIngredientsForWeek(this.family, this.week);
      console.log('Grocery List:', this.groceryList);
    } catch (error) {
      console.error('Error fetching grocery list:', error);
    }
  }

  goBack(): void {
    this.router.navigate(['/MealPlansHome']); // Replace with the actual route
  }
}
