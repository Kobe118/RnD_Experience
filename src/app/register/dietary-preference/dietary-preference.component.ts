import { Component, OnInit } from '@angular/core';
import { SupabaseService} from "../../services/supabase.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-dietary-preference',
    templateUrl: './dietary-preference.component.html',
    styleUrls: ['./dietary-preference.component.scss']
})
export class DietaryPreferenceComponent implements OnInit {
    loading = false;
    ingredients: any[] = [];
    selectedDietaryPreference: string[] = [];
    userId: string | undefined;

    constructor(private supabaseService: SupabaseService, private router: Router) {}

    async ngOnInit(): Promise<void> {
        try {
            this.ingredients = await this.supabaseService.getIngredients();
            console.log("Ingredients:", this.ingredients);
            this.selectedDietaryPreference = await this.supabaseService.get_user_dislikes();
            console.log("user dislike", this.selectedDietaryPreference);
        } catch (error) {
            console.error("Error fetching allergies:", error);
        }
    }

    async selectDietaryPreference(ingredients: any) {
        const ingredientsId = ingredients.id;
        try{
            this.loading= true;

        console.log(ingredients.ingredient)
        const user = await this.supabaseService.getUserId();
        console.log('userID',user);
        if (user !== undefined) {
            this.supabaseService.linkIngredientToUserDislikes(user.id, ingredientsId);
            this.selectedDietaryPreference.push(ingredients.name);
        } else {
            console.error('User ID is undefined');
        }
        }catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            this.loading = false;
        }
    }

    isDietaryPreferenceSelected(ingredients: any): boolean {
        // Check if the current allergy is already selected
        return this.selectedDietaryPreference.includes(ingredients.name);
    }

    navigateBack(){
        this.router.navigate(['allergies'])
    }

    navigateToCongrats() {
        this.router.navigate(['home']);
    }
}
