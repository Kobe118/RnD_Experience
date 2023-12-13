import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SupabaseService } from "../services/supabase.service";
import { Profile } from './profile.model';
import {User} from "../families/user.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  profile: Profile = {name: "", first_name: ""};
  user: any = {};


  updateProfileForm = this.formBuilder.group({
    firstname: '',
    name: ''
  });

  constructor(
      private readonly supabaseService: SupabaseService,
      private readonly formBuilder: FormBuilder,
      private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getProfile();

    if (this.profile) {
      const { first_name, name } = this.profile;
      this.updateProfileForm.patchValue({
        firstname: first_name,
        name: name,
      });
    }
    await this.getImageUrl();
  }

  async getProfile() {
    try {
      this.loading = true;
      const user = await this.supabaseService.getUserId(); // Retrieve the user 
      console.log("profile user: ", user);
      if (user) {
        const userProfile = await this.supabaseService.profile(user);
        console.log("profile user profile: ", userProfile.data);

        this.profile.name = userProfile.data?.name
        this.profile.first_name = userProfile.data?.first_name

        const { name, first_name } = this.profile;
        this.updateProfileForm.patchValue({
          firstname: first_name,
          name: name,
        });
      } else {
        throw new Error('User ID not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async getImageUrl() {
    try {
      this.loading = true;
      const user = await this.supabaseService.getUserId(); // Retrieve the user
      if (user) {
        const imageUrl = await this.supabaseService.getUserPictureUrl(`${user.id}.jpg`);
        this.user.picture_url = imageUrl; // Assign the fetched image URL to user.picture_url
      } else {
        throw new Error('User ID not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async updateProfile(): Promise<void> {
    try {
      this.loading = true;
      const firstname = this.updateProfileForm.value.firstname as string;
      const name = this.updateProfileForm.value.name as string;
      const user = await this.supabaseService.getUserId(); // Retrieve the user ID

      if (user.id) {
        const { error } = await this.supabaseService.updateProfile({
          id: user.id,
          first_name: firstname,
          name: name,
        });
        if (error) {
          throw error;
        }
        alert('Profile updated successfully! Please note that it might take some time for changes to appear.');
      } else {
        throw new Error('User ID not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async onFileInputChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      try {
        const user = await this.supabaseService.getUserId();
        const response = await this.supabaseService.uploadFile(file, user);
        console.log('File upload response:', response);
        console.log('id', user)
        // Handle success or display information about the uploaded file
      } catch (error) {
        console.error('File upload error:', error);
        // Handle error while uploading the file
      }
    }
  }


  handleImageError(user: User) {
    user.picture_url = "\\assets\\default-user.jpg";
  }

  navigateToHome() {
    this.router.navigate(['Home']);

  }

  async signOut() {
    await this.supabaseService.signOut();
  }
}
