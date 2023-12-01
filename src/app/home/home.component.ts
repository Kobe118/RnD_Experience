import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Recipe, PreferredRecipe, Family } from './home.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  preferredRecipes: PreferredRecipe[] = [];
  families: Family[] = [];
  urlUpcoming: string[] = [];
  urlPreferred: string[] = [];
  errorMessage?: string;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      const recipes = await this.supabaseService.getUpcomingRecipes();
      if (recipes) {
        this.recipes = recipes[0] as Recipe[];
        console.log('upcoming: ', this.recipes);
        this.loadImageUrls(this.recipes);
      }
      const preferredRecipes = await this.supabaseService.getPreferredRecipes();
      if(preferredRecipes){
        this.preferredRecipes = preferredRecipes[0] as PreferredRecipe[];
        this.loadImagePreferredUrls(this.preferredRecipes);
      }
      const families = await this.supabaseService.getFamilies();
      if(preferredRecipes){
        this.families = families[0] as Family[];
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

  async loadImagePreferredUrls(preferredRecipes:PreferredRecipe[]) {
    for (const x in preferredRecipes) {
        this.urlPreferred.push(await this.supabaseService.getImageUrl(preferredRecipes[x].recipe));
    }
  }
}
