import { Component } from '@angular/core';
import {NavigationService} from "../../NavigationService";

@Component({
    selector: 'CongratsPage',
    templateUrl: './CongratsPage.component.html',
    styleUrls: ['./CongratsPage.component.css']
})
export class CongratsPageComponent {
    constructor(private navigationService: NavigationService) {} // Inject the service

    redirectToNewPage() {
        this.navigationService.redirectToPage(this.navigationService.Main); // Use the service to navigate
    }
}