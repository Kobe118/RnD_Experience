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
            this.ingredients.sort((a, b) => a.name.localeCompare(b.name));
            this.selectedDietaryPreference = await this.supabaseService.getUserDislikes();
            console.log("user dislike", this.selectedDietaryPreference);
        } catch (error) {
            console.error("Error fetching allergies:", error);
        }
    }

    formatName(name: string): string {
        // Custom formatting logic
        return name.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
    }

    async selectDietaryPreference(ingredients: any) {
        const ingredientsId = ingredients.id;
        try {
            this.loading = true;

            console.log(ingredients.name)
            const user = await this.supabaseService.getUserId();
            console.log('userID', user);
            if (user !== undefined) {
                if (this.isDietaryPreferenceSelected(ingredients)) {
                    this.supabaseService.unlinkIngredientFromUserDislikes(user.id, ingredientsId);
                    const index = this.selectedDietaryPreference.indexOf(ingredients.name)
                    if (index > -1) {
                        this.selectedDietaryPreference.splice(index, 1);
                    }
                }else {
                        this.supabaseService.linkIngredientToUserDislikes(user.id, ingredientsId);
                        this.selectedDietaryPreference.push(ingredients.name);
                    }
                } else {
                    console.error('User ID is undefined');
                }
        }catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                }
            }finally {
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
    navigateToProfile(){
        this.router.navigate(['profile'])
    }

}
