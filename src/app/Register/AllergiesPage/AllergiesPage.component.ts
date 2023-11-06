import { Component } from '@angular/core';
import {NavigationService} from "../../NavigationService";

@Component({
    selector: 'AllergiesPage',
    templateUrl: './AllergiesPage.component.html',
    styleUrls: ['./AllergiesPage.component.css']
})
export class AllergiesPageComponent {
    constructor(private navigationService: NavigationService) {} // Inject the service

    redirectToSignUpPage() {
        this.navigationService.redirectToPage(this.navigationService.SignUpPage); // Use the service to navigate
    }
    redirectToDietaryPreferencePage() {
        this.navigationService.redirectToPage(this.navigationService.DietaryPreferencePage); // Use the service to navigate
    }
}