// recipes.component.ts
import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import {Observable} from "rxjs"; // Import the Recipe interface

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
    liked_numbers = 0;
    liked_recipes: Recipe[] = []; // Declare recipes as an array of Recipe
    liked_urls:String[] = [];
    postId?: number; // Use '?' for optional property
    errorMessage?: string;
    generatedrecipe: string = "";  // Initialize as empty string
    showedrecipe:string = ""
    constructor(private recipeService: RecipeService) {}

    ngOnInit() {
        this.recipeService.get_Liked_Recipes().then(recipes => {
            if (recipes) {
                this.liked_recipes = recipes;
                this.loadImageUrls(this.liked_recipes)
            }
        }).catch(error => {
            console.error('Error fetching recipes:', error);
        });
    }

    async loadImageUrls(recipes:Recipe[]) {
        for (let i = 0; i < recipes.length; i++) {
            this.liked_urls.push(await this.recipeService.getImageUrl(recipes[i].id))
        }
    }
    // Inside your RecipeComponent class
    async sendRecipeRequest() {
        this.generatedrecipe = await this.recipeService.postRecipeData( "");
        this.showedrecipe = this.generatedrecipe
    }

    toggleHeart(recipe: Recipe) {
        console.log(this.liked_recipes)
    }

    get recipeIndices() {
        return this.liked_recipes ? Array.from({ length: this.liked_recipes.length }, (_, i) => i) : [];
    }

}

