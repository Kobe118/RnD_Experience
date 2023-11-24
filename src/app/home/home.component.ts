import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Recipe, PreferredRecipes } from './home.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  preferredRecipes: PreferredRecipes[] = [];
  urls: string[] = [];
  errorMessage?: string;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      const recipes = await this.supabaseService.getUpcomingRecipes();
      if (recipes) {
        this.recipes = recipes;
        this.loadImageUrls(this.recipes);
      }
      const preferredRecipes = await this.supabaseService.getPreferredRecipes();
    } catch (error) {
      console.error('Error fetching recipes:', error);
      this.errorMessage = 'Error fetching recipes';
    }
  }

  async loadImageUrls(recipes:Recipe[]) {
    for (const recipe in recipes) {
        this.urls.push(await this.supabaseService.getImageUrl("65829b95-426e-4eb3-8844-f261805dbee3"));
    }
}
}
