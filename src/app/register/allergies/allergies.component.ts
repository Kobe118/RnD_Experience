import { Component } from '@angular/core';

import {SupabaseService} from "../../services/supabase.service";

import { Allergy } from "./allergy.model";

@Component({
    selector: 'app-allergies',
    templateUrl: './allergies.component.html',
    styleUrls: ['./allergies.component.scss']
})
export class AllergiesComponent {
    allergies: any[] = [];
    userId: string | undefined;
    constructor(private supabaseService: SupabaseService) {} // Inject the service

    async ngOnInit(): Promise<void> {
        this.allergies = await this.supabaseService.getAllergies();
        console.log("Allergies :", this.supabaseService.getAllergies());
    }


    selectAllergies(allergies: any) {
        const allergieId = allergies.id;

        console.log(allergies.allergie)
        if (this.userId !== undefined) {
            this.supabaseService.linkAllergieToUserAllergies(this.userId, allergieId);
        } else {
            console.error('User ID is undefined');
        }
    }
}