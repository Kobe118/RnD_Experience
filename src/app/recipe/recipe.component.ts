// recipes.component.ts
import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import {Observable} from "rxjs";
import {SupabaseService} from "../services/supabase.service"; // Import the Recipe interface

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
    liked_numbers = 0;
    liked_recipes: Recipe[] = []; // Declare recipes as an array of Recipe
    liked_urls:String[] = [];
    liked_recipes_liked:boolean[] = [];
    unliked_recipes: Recipe[] = [];
    unliked_urls:String[] = [];
    unliked_recipe_liked:boolean[] = [];
    postId?: number; // Use '?' for optional property
    errorMessage?: string;
    generatedrecipe: string = "";  // Initialize as empty string
    showedrecipe:string = ""
    constructor(private recipeService: RecipeService,private supabaseService: SupabaseService) {}

    ngOnInit() {
        this.supabaseService.get_Liked_Recipes().then(recipes => {
            if (recipes) {
                this.liked_recipes = recipes;
                this.liked_recipes_liked = new Array(this.liked_recipes.length).fill(true);
                this.loadImageUrls(this.liked_recipes)
            }
        }).catch(error => {
            console.error('Error fetching recipes:', error);
        });
    }

    async loadImageUrls(recipes:Recipe[]) {
        for (let i = 0; i < recipes.length; i++) {
            this.liked_urls.push(await this.supabaseService.getImageUrl(recipes[i].id))
        }
    }
    // Inside your RecipeComponent class
    async sendRecipeRequest() {
        this.generatedrecipe = await this.recipeService.postRecipeData( "");
        this.showedrecipe = this.generatedrecipe
    }

    toggle_like_Heart(index:number) {
        if (this.liked_recipes_liked[index]){
            this.supabaseService.reviewRecipe(this.liked_recipes[index].id,3)
            this.liked_recipes_liked[index] = false
        }
        else {
            this.supabaseService.reviewRecipe(this.liked_recipes[index].id,5)
            this.liked_recipes_liked[index] = true
        }
    }

    get recipeIndices() {
        return this.liked_recipes ? Array.from({ length: this.liked_recipes.length }, (_, i) => i) : [];
    }

}

