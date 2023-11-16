import {Component, Input} from '@angular/core';
import {NavigationService} from "../NavigationService";


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent {
    @Input() title="No title set yet";
    @Input() subtitle="No subtitle";
    constructor(private navigationService: NavigationService) {} // Inject the service

    redirectToProfilePage() {
        this.navigationService.redirectToPage(this.navigationService.ProfilePage); // Use the service to navigate
    }
    
}
