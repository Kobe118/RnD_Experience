import { Component } from '@angular/core';
import {NavigationService} from "../../services/navigation.service";
import {SupabaseService} from "../../supabase.service";

@Component({
    selector: 'app-allergies',
    templateUrl: './allergies.component.html',
    styleUrls: ['./allergies.component.scss']
})
export class AllergiesComponent {
    preferences: any[] = [];
    userId: string | undefined;
    constructor(private navigationService: NavigationService, private supabaseService: SupabaseService) {} // Inject the service

    ngOnInit(): void {
        this.loadAllergies();
        this.userId = this.supabaseService.getUserId();
    }

    loadAllergies(): void {
        this.supabaseService.getAllergies().then(({ data, error }) => {
            if (error) {
                console.error('Error fetching preferences:', error);
                // Handle error scenarios
            } else {
                this.preferences = data || [];
            }
        });
    }

    selectAllergies(preference: any) {
        // Assuming 'id' is the property in the preference object representing the ingredient ID
        const allergieId = preference.id;

        if (this.userId !== undefined) {
            // Call the function that expects a string argument
            this.supabaseService.linkAllergieToUserAllergies(this.userId, allergieId);
        } else {
            // Handle the case where userId is undefined (if applicable)
            console.error('User ID is undefined');
        }
    }

    // Method to link the ingredient to the user's allergies using SupabaseService
    linkIngredientToUserAllergies(userId: string, allergieId: string) {
        this.supabaseService.linkAllergieToUserAllergies(userId, allergieId)
            .then(response => {
                console.log('Allergies linked to user dislikes:', response);
                // Handle success (if needed)
            })
    }

    redirectToSignUpPage() {
        this.navigationService.redirectToPage(this.navigationService.Congrats); // Use the service to navigate
    }
    redirectToDietaryPreferencePage() {
        this.navigationService.redirectToPage(this.navigationService.DietaryPreference); // Use the service to navigate
    }
}