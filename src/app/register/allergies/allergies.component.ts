import { Component } from '@angular/core';

import {SupabaseService} from "../../services/supabase.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-allergies',
    templateUrl: './allergies.component.html',
    styleUrls: ['./allergies.component.scss']
})
export class AllergiesComponent {
    allergies: any[] = [];
    selectedAllergies: string[] = [];
    userId: string | undefined;
    constructor(private supabaseService: SupabaseService, private router: Router) {} // Inject the service

    async ngOnInit(): Promise<void> {
        try {
            this.allergies = await this.supabaseService.getAllergies();
            console.log("Allergies:", this.allergies);
            // Fetch selected allergies for the current user
            this.selectedAllergies = await this.supabaseService.get_user_allergies();
        } catch (error) {
            console.error("Error fetching allergies:", error);
        }
    }



    async selectAllergies(allergies: any) {
        const allergieId = allergies.id;

        console.log(allergies.allergie)
        const user = await this.supabaseService.getUserId();
        if (user !== undefined) {
            this.supabaseService.linkAllergieToUserAllergies(user, allergieId);
            // Add selected allergy to the array when clicked
            this.selectedAllergies.push(allergies.allergie);
        } else {
            console.error('User ID is undefined');
        }
    }

    isAllergySelected(allergies: any): boolean {
        // Check if the current allergy is already selected
        return this.selectedAllergies.includes(allergies.allergie);
    }

    navigateToDietaryPreference() {
        this.router.navigate(['dietaryPreference']);
    }
}