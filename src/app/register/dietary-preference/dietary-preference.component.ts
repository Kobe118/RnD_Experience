import { Component } from '@angular/core';
import {NavigationService} from "../../services/navigation.service";

@Component({
    selector: 'app-dietary-preference',
    templateUrl: './dietary-preference.component.html',
    styleUrls: ['./dietary-preference.component.scss']
})
export class DietaryPreferenceComponent {
    constructor(private navigationService: NavigationService) {} // Inject the service

    redirectToAllergiesPage() {
       this.navigationService.redirectToPage(this.navigationService.Allergies); // Use the service to navigate
    }
    redirectToWelcomePage() {
        this.navigationService.redirectToPage(this.navigationService.Welcome); // Use the service to navigate
    }
}