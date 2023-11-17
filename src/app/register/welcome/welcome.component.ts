import { Component } from '@angular/core';
import {NavigationService} from "../../navigation-service";

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
    constructor(private navigationService: NavigationService) {} // Inject the service

    redirectToNewPage() {
        this.navigationService.redirectToPage(this.navigationService.SignUp); // Use the service to navigate
    }
}