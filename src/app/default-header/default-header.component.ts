import {Component, Input} from '@angular/core';
import {NavigationService} from "../services/navigation.service";
import { SupabaseService} from "../services/supabase.service";


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent {
    @Input() title="No title set yet";
    @Input() subtitle="No subtitle";

    imageurl:string = "";
    constructor(private navigationService: NavigationService, private readonly supabaseService: SupabaseService) {
    }

    async getImageUrl() {
        this.imageurl = await this.supabaseService.getUserPictureUrl('test_user_2.jpg');
    }
    ngOnInit() {
        this.getImageUrl().then(() => {
            console.log('Image URL loaded successfully:', this.imageurl);
        }).catch(error => {
            console.error('Error loading image URL:', error);
        });
    }

    redirectToProfilePage() {
        this.navigationService.redirectToPage(this.navigationService.Profile); // Use the service to navigate
    }
    
}