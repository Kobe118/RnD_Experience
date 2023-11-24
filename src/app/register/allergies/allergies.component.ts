import { Component } from '@angular/core';
import {NavigationService} from "../../services/navigation.service";
import {SupabaseService} from "../../supabase.service";

@Component({
    selector: 'app-allergies',
    templateUrl: './allergies.component.html',
    styleUrls: ['./allergies.component.scss']
})
export class AllergiesComponent {
    allergies: any[] = [];
    userId: string | undefined;
    constructor(private navigationService: NavigationService, private supabaseService: SupabaseService) {} // Inject the service

    async ngOnInit(): Promise<void> {
        try {
            this.userId = await this.supabaseService.getUserId();
            if (!this.userId) {
                // Redirect to login or authentication page
                this.navigationService.redirectToPage(this.navigationService.Login);
            } else {
                this.loadAllergies();
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
            // Handle the error accordingly, perhaps by redirecting to an error page or displaying a message
        }
    }



    loadAllergies(): void {
        this.supabaseService.getAllergies().then(({ data, error }) => {
            if (error) {
                console.error('Error fetching preferences:', error);
                // Handle error scenarios
            } else {
                this.allergies = data || [];
            }
        });
    }

    selectAllergies(allergies: any) {
        const allergieId = allergies.id;

        if (this.userId !== undefined) {
            this.supabaseService.linkAllergieToUserAllergies(this.userId, allergieId);
        } else {
            console.error('User ID is undefined');
        }
    }

    redirectToSignUpPage() {
        this.navigationService.redirectToPage(this.navigationService.Congrats); // Use the service to navigate
    }
    redirectToDietaryPreferencePage() {
        this.navigationService.redirectToPage(this.navigationService.DietaryPreference); // Use the service to navigate
    }
}