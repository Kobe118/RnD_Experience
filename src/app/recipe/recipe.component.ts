// recipes.component.ts
import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model'; // Import the Recipe interface

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
    recipes: Recipe[] = []; // Declare recipes as an array of Recipe
    urls:String[] = [];
    constructor(private recipeService: RecipeService) {}

    ngOnInit() {
        this.recipeService.getRecipes().then(recipes => {
            if (recipes) {
                this.recipes = recipes;
                this.loadImageUrls(this.recipes)
            }
        }).catch(error => {
            console.error('Error fetching recipes:', error);
        });
    }

    async loadImageUrls(recipes:Recipe[]) {
        for (const recipe in recipes) {
            this.urls.push(await this.recipeService.getImageUrl("65829b95-426e-4eb3-8844-f261805dbee3"));
        }
    }


    toggleHeart(recipe: Recipe) {
        console.log(this.recipes)
    }
}

