import { Component } from '@angular/core';
import {NavigationService} from "../../services/navigation.service";

@Component({
    selector: 'app-allergies',
    templateUrl: './allergies.component.html',
    styleUrls: ['./allergies.component.scss']
})
export class AllergiesComponent {
    constructor(private navigationService: NavigationService) {} // Inject the service

    redirectToSignUpPage() {
        this.navigationService.redirectToPage(this.navigationService.Congrats); // Use the service to navigate
    }
    redirectToDietaryPreferencePage() {
        this.navigationService.redirectToPage(this.navigationService.DietaryPreference); // Use the service to navigate
    }
}