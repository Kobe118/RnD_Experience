import { Component } from '@angular/core';
import {NavigationService} from "../../NavigationService";

@Component({
    selector: 'WelcomePage',
    templateUrl: './WelcomePage.component.html',
    styleUrls: ['./WelcomePage.component.css']
})
export class WelcomePageComponent {
    constructor(private navigationService: NavigationService) {} // Inject the service

    redirectToNewPage() {
        this.navigationService.redirectToPage(this.navigationService.DietaryPreferencePage); // Use the service to navigate
    }
}