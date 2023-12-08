import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Recipe} from "../home/home.model";
import {SupabaseService} from "../services/supabase.service";

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit{

  recipes: Recipe[] = [];
  urlUpcoming: string[] = [];
  errorMessage?: string;

  constructor(private router: Router, private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      const recipes = await this.supabaseService.getUpcomingRecipes();
      if (recipes) {
        this.recipes = recipes[0] as Recipe[];
        console.log('upcoming: ', this.recipes);
        this.loadImageUrls(this.recipes);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      this.errorMessage = 'Error fetching recipes';
    }
  }

  async loadImageUrls(recipes:Recipe[]) {
    for (const x in recipes) {
      this.urlUpcoming.push(await this.supabaseService.getImageUrl(recipes[x].recipe));
    }
  }
  goBack(): void {
    this.router.navigate(['/MealPlansHome']);
  }

}
