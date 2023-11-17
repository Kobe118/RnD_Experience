import {Component, Input} from '@angular/core';
import {NavigationService} from "../NavigationService";
import { SupabaseService} from "../supabase.service";


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent {
    @Input() title="No title set yet";
    @Input() subtitle="No subtitle";
    constructor(private navigationService: NavigationService, private readonly supabaseService: SupabaseService) {
    } // Inject the service


    imageurl = this.supabaseService.getUserPictureUrl('test_user_2.jpg');

    redirectToProfilePage() {
        this.navigationService.redirectToPage(this.navigationService.ProfilePage); // Use the service to navigate
    }
    
}
