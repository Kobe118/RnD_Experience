import { Component } from '@angular/core';
import {NavigationService} from "../../navigation-service";

@Component({
    selector: 'app-congrats',
    templateUrl: './congrats.component.html',
    styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent {
    constructor(private navigationService: NavigationService) {} // Inject the service

    redirectToNewPage() {
        this.navigationService.redirectToPage(this.navigationService.Main); // Use the service to navigate
    }
}