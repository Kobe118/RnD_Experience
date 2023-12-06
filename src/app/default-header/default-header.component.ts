import {Component, Input, OnInit} from '@angular/core';
import {NavigationService} from "../services/navigation.service";
import { SupabaseService} from "../services/supabase.service";


@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent implements OnInit{
    @Input() title="No title set yet";
    @Input() subtitle="No subtitle";

    imageurl:string = "";
    currentUser: any = {};
    constructor(private navigationService: NavigationService, private readonly supabaseService: SupabaseService) {
    }

    async getCurrentUser() {
        try {
            const { data } = await this.supabaseService.supabase.auth.getUser();

            if (data) {
                this.currentUser = data.user;
                console.log('User ID:', this.currentUser.id);
                console.log('User Email:', this.currentUser.email);
            } else {
                console.log('No authenticated user');
            }
        } catch (error) {
            console.error('Error getting user:', error);
        }
    }
    async getImageUrl() {
        this.imageurl = await this.supabaseService.getUserPictureUrl(`${this.currentUser.id}.jpg`);
    }
    ngOnInit() {
        this.getCurrentUser().then(()=>{
            this.getImageUrl().then(() => {
                console.log('Image URL loaded successfully:', this.imageurl);
            }).catch(error => {
                console.error('Error loading image URL:', error);
            });
        })

    }

    redirectToProfilePage() {
        this.navigationService.redirectToPage(this.navigationService.Profile); // Use the service to navigate
    }

    handleImageError() {
        this.imageurl = "\\assets\\default-user.jpg";
    }

    
}