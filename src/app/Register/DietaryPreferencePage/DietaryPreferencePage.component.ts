import { Component } from '@angular/core';
import {NavigationService} from "../../NavigationService";

@Component({
    selector: 'DietaryPreferencePage',
    templateUrl: './DietaryPreferencePage.component.html',
    styleUrls: ['./DietaryPreferencePage.component.css']
})
export class DietaryPreferencePageComponent {
    constructor(private navigationService: NavigationService) {} // Inject the service

    redirectToAllergiesPage() {
       this.navigationService.redirectToPage(this.navigationService.AllergiesPage); // Use the service to navigate
    }
    redirectToWelcomePage() {
        this.navigationService.redirectToPage(this.navigationService.WelcomePage); // Use the service to navigate
    }
}