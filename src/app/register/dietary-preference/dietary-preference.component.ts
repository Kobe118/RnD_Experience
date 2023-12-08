import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import {NavigationService} from "../../services/navigation.service";

@Component({
    selector: 'app-dietary-preference',
    templateUrl: './dietary-preference.component.html',
    styleUrls: ['./dietary-preference.component.scss']
})
export class DietaryPreferenceComponent implements OnInit {
    preferences: any[] = [];
    userId: string | undefined;

    constructor(private supabaseService: SupabaseService, private navigationService: NavigationService) {}

    async ngOnInit(): Promise<void> {
        try {
            this.userId = await this.supabaseService.getUserId();
            if (!this.userId) {
                // Redirect to login or authentication page
                this.navigationService.redirectToPage(this.navigationService.Login);
            } else {
                this.loadDietaryPreferences();
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
            // Handle the error accordingly, perhaps by redirecting to an error page or displaying a message
        }
    }

    loadDietaryPreferences(): void {
        this.supabaseService.getIngredients().then(({ data, error }) => {
            if (error) {
                console.error('Error fetching preferences:', error);
                // Handle error scenarios
            } else {
                this.preferences = data || [];
            }
        });
    }

    // Method to handle selecting a preference
    selectPreference(preference: any) {
        // Assuming 'id' is the property in the preference object representing the ingredient ID
        const ingredientId = preference.id;

        if (this.userId !== undefined) {
            // Call the function that expects a string argument
            this.supabaseService.linkIngredientToUserDislikes(this.userId, ingredientId);
        } else {
            // Handle the case where userId is undefined (if applicable)
            console.error('User ID is undefined');
        }
    }

    // Method to link the ingredient to the user's dislikes using SupabaseService
    linkIngredientToUserDislikes(userId: string, ingredientId: string) {
        this.supabaseService.linkIngredientToUserDislikes(userId, ingredientId)
            .then(response => {
                console.log('Ingredient linked to user dislikes:', response);
                // Handle success (if needed)
            })
    }

    redirectToAllergiesPage() {
        this.navigationService.redirectToPage(this.navigationService.Allergies); // Use the service to navigate
    }
    redirectToWelcomePage() {
        this.navigationService.redirectToPage(this.navigationService.Welcome); // Use the service to navigate
    }
}
