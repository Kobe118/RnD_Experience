// recipes.component.ts
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Router } from '@angular/router';
import { SupabaseService } from "../services/supabase.service"; // Import the Recipe interface

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
    liked_numbers = 0;
    liked_recipes: Recipe[] = []; // Declare recipes as an array of Recipe
    liked_urls:string[] = [];
    liked_recipes_liked:boolean[] = [];
    unliked_recipes: Recipe[] = [];
    unliked_urls:string[] = [];
    unliked_recipe_unliked:boolean[] = [];
    recommended_recipes: Recipe[] = [];
    recommended_urls:string[] = [];
    recommended_recipes_liked:boolean[] = [];
    recommended_recipes_unliked:boolean[] = [];
    postId?: number; 
    errorMessage?: string;
    generatedrecipe: string = "";  
    showedrecipe:string = "";
    isLoading = false;
    constructor(private supabaseService: SupabaseService, private router: Router ) {}

    ngOnInit() {
        this.supabaseService.getLikedRecipes().then(recipes => {
            if (recipes) {
                this.liked_recipes = recipes;
                this.liked_recipes_liked = new Array(this.liked_recipes.length).fill(true);
                this.load_liked_image(this.liked_recipes)
            }
            this.supabaseService.getDislikedRecipes().then(recipes => {
                if (recipes) {
                    this.unliked_recipes = recipes;
                    this.unliked_recipe_unliked = new Array(this.unliked_recipes.length).fill(true);
                    this.load_unliked_image(this.unliked_recipes)
                }
                this.supabaseService.getOtherRecipes(this.liked_recipes,this.unliked_recipes).then(recipes => {
                    if (recipes) {
                        this.recommended_recipes = recipes;
                        this.recommended_recipes_liked = new Array(this.recommended_recipes.length).fill(false);
                        this.recommended_recipes_unliked = new Array(this.recommended_recipes.length).fill(false);
                        this.load_recommended_image(this.recommended_recipes)
                    }
                }).catch(error => {
                    console.error('Error fetching recipes:', error);
                });
            }).catch(error => {
                console.error('Error fetching recipes:', error);
            });
        }).catch(error => {
            console.error('Error fetching recipes:', error);
        });


    }

    async load_liked_image(recipes:Recipe[]) {
        for (const element of recipes) {
            this.liked_urls.push(await this.supabaseService.getImageUrl(element.id))
        }
    }

    async load_unliked_image(recipes:Recipe[]) {
        for (const element of recipes) {
            this.unliked_urls.push(await this.supabaseService.getImageUrl(element.id))
        }
    }

    async load_recommended_image(recipes:Recipe[]) {
        for (const element of recipes) {
            this.recommended_urls.push(await this.supabaseService.getImageUrl(element.id))
        }
    }

    // Inside your RecipeComponent class
    async sendRecipeRequest() {
        this.isLoading = true; 
        alert("It might take more than 1 minute");
        try {
            const allergies = await this.supabaseService.getUserAllergies();
            const dislikes = await this.supabaseService.getUserDislikes();
            const message = "this user doesn't have preference";

            console.log(allergies, dislikes); // 检查值

            this.generatedrecipe = await this.supabaseService.postRecipeData({allergies, preferences: dislikes, message});

            this.router.navigate(['/recipe_detail', this.generatedrecipe]);
        } catch (error) {
            console.error('Error generating recipe:', error);
            // 可以在这里处理错误
        } finally {
            this.isLoading = false; // 结束加载
        }
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
    unlike_recipe(index:number) {
        if (this.unliked_recipe_unliked[index]){
            this.supabaseService.reviewRecipe(this.unliked_recipes[index].id,3)
            this.unliked_recipe_unliked[index] = false
        }
        else {
            this.supabaseService.reviewRecipe(this.unliked_recipes[index].id,0)
            this.unliked_recipe_unliked[index] = true
        }
    }

    like_recommended_recipe(index:number) {
        if (this.recommended_recipes_liked[index]){
            this.supabaseService.reviewRecipe(this.recommended_recipes[index].id,3)
            this.recommended_recipes_liked[index] = false
        }
        else {
            this.supabaseService.reviewRecipe(this.recommended_recipes[index].id,5)
            this.recommended_recipes_liked[index] = true
            this.recommended_recipes_unliked[index] = false
        }
    }

    unlike_recommended_recipe(index:number) {
        if (this.recommended_recipes_unliked[index]){
            this.supabaseService.reviewRecipe(this.recommended_recipes[index].id,3)
            this.recommended_recipes_unliked[index] = false
        }
        else {
            this.supabaseService.reviewRecipe(this.recommended_recipes[index].id,0)
            this.recommended_recipes_unliked[index] = true
            this.recommended_recipes_liked[index] = false
        }
    }

    get recipeIndices() {
        return this.liked_recipes ? Array.from({ length: this.liked_recipes.length }, (_, i) => i) : [];
    }

    get unliked_recipeIndices() {
        return this.unliked_recipes ? Array.from({ length: this.unliked_recipes.length }, (_, i) => i) : [];
    }

    get recommended_recipeIndices() {
        return this.recommended_recipes ? Array.from({ length: this.recommended_recipes.length }, (_, i) => i) : [];
    }

    navigateToRecipeDetail(id: string) {
        this.router.navigate(['/recipe_detail', id]); 
    }

}

