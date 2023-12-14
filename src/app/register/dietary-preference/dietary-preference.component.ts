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
    userId: string | undefined;

    constructor(private supabaseService: SupabaseService, private router: Router) {}

    async ngOnInit(): Promise<void> {
        try {
            this.ingredients = await this.supabaseService.getIngredients();
            console.log("Ingredients:", this.ingredients);
        } catch (error) {
            console.error("Error fetching allergies:", error);
        }
    }

    selectDietaryPreference(ingredients: any) {
        const ingredientsId = ingredients.id;

        console.log(ingredients.ingredient)
        if (this.userId !== undefined) {
            this.supabaseService.linkIngredientToUserDislikes(this.userId, ingredientsId);
        } else {
            console.error('User ID is undefined');
        }
    }

    navigateToCongrats() {
        this.router.navigate(['home']);
    }
}
