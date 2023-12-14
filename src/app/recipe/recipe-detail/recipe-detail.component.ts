import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from "../../services/supabase.service";
import { Location } from '@angular/common';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipeId: string = "";
  imageUrl: string = "";
  name: string = "recipe name";
  steps: string = "recipe steps";
  allergies: string[] = [];
  ingredients: any[] = []; // Array to store ingredient details
  liked:boolean = false;
  disliked:boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private supabaseService: SupabaseService,private location: Location) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id') || "";
    if (!this.recipeId) {
      this.router.navigate(['/recipes']);
      return;
    }
    this.supabaseService.getDislikedRecipes();
    this.fetchRecipeDetails(this.recipeId);
  }

  private fetchRecipeDetails(id: string) {
    this.supabaseService.getRecipeById(id).then(recipe => {
      if (recipe && recipe[0]) {
        console.log("Recipe data:", recipe[0]); // Debug output
        this.updateRecipeDetails(recipe[0]);
        this.fetchAllergies(id);
        this.fetchIngredients(id);
        this.fetchImageUrl(id);
      } else {
        console.error("No recipe found for ID:", id);
        this.router.navigate(['/recipes']);
      }
    }).catch(error => {
      console.error("Error fetching recipe:", error);
      this.router.navigate(['/recipes']);
    });
  }

  private fetchImageUrl(id: string) {
    this.supabaseService.getImageUrl(id).then(url => {
      if (url) {
        this.imageUrl = url;
      } else {
        console.log("No image URL found for recipe ID:", id);
      }
    }).catch(error => {
      console.error("Error fetching image URL:", error);
    });
  }

  private fetchIngredients(id: string) {
    this.supabaseService.getRecipeIngredients(id).then(ingredients => {
      if (ingredients) {
        console.log("Ingredients data:", ingredients); // Debug output
        this.ingredients = ingredients;
      } else {
        console.log("No ingredients found for recipe ID:", id);
      }
    }).catch(error => {
      console.error("Error fetching ingredients:", error);
    });
  }

  private updateRecipeDetails(recipeData: any) {
    this.name = recipeData.name || "Unknown name";
    this.steps = recipeData.manual || "No steps available";
    // ... handle other data ...
  }

  private fetchAllergies(id: string) {
    this.supabaseService.getRecipeAllergies(id).then(allergies => {
      if (allergies) {
        console.log("Allergies data:", allergies); // Debug output
        this.allergies = allergies;
      } else {
        console.log("No allergies found for recipe ID:", id);
      }
    }).catch(error => {
      console.error("Error fetching allergies:", error);
    });
  }

  like_recommended_recipe() {
    if (this.liked){
      this.supabaseService.reviewRecipe(this.recipeId,3)
      this.liked = false
    }
    else {
      this.supabaseService.reviewRecipe(this.recipeId,5)
      this.liked = true
      this.disliked = false
    }
  }
  unlike_recommended_recipe() {
    if (this.disliked){
      this.supabaseService.reviewRecipe(this.recipeId,3)
      this.disliked = false
    }
    else {
      this.supabaseService.reviewRecipe(this.recipeId,5)
      this.disliked = true
      this.liked = false
    }
  }
}
