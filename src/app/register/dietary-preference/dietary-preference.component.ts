import { Component, OnInit } from '@angular/core';
import { SupabaseService} from "../../services/supabase.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-dietary-preference',
    templateUrl: './dietary-preference.component.html',
    styleUrls: ['./dietary-preference.component.scss']
})
export class DietaryPreferenceComponent implements OnInit {
    ingredients: any[] = [];
    selectedDietaryPreference: string[] = [];
    userId: string | undefined;

    constructor(private supabaseService: SupabaseService, private router: Router) {}

    async ngOnInit(): Promise<void> {
        try {
            this.ingredients = await this.supabaseService.getIngredients();
            console.log("Ingredients:", this.ingredients);
            this.selectedDietaryPreference = await this.supabaseService.get_user_dislikes();
        } catch (error) {
            console.error("Error fetching allergies:", error);
        }
    }

    async selectDietaryPreference(ingredients: any) {
        const ingredientsId = ingredients.id;

        console.log(ingredients.ingredient)
        const user = await this.supabaseService.getUserId();
        console.log('userID',user);
        if (user !== undefined) {
            this.supabaseService.linkIngredientToUserDislikes(user.id, ingredientsId);
            this.selectedDietaryPreference.push(ingredients.ingredient);
        } else {
            console.error('User ID is undefined');
        }
    }

    isDietaryPreferenceSelected(ingredients: any): boolean {
        // Check if the current allergy is already selected
        return this.selectedDietaryPreference.includes(ingredients.ingredient);
    }

    navigateToCongrats() {
        this.router.navigate(['home']);
    }
}
