import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SupabaseService, Profile } from "../services/supabase.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = false;
  profile!: Profile;
  updateProfileForm = this.formBuilder.group({
    firstname: '',
    name: ''
  });

  constructor(
      private readonly supabaseService: SupabaseService,
      private readonly formBuilder: FormBuilder
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
  }

  async getProfile() {
    try {
      this.loading = true;
      const user = await this.supabaseService.getUserId(); // Retrieve the user 
      console.log("profile user: ", user);
      if (user) {
        const userProfile = await this.supabaseService.profile(user.id);
        console.log("profile user profile: ", userProfile);
        const { first_name, name } = this.profile;
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

  async updateProfile(): Promise<void> {
    try {
      this.loading = true;
      const firstname = this.updateProfileForm.value.firstname as string;
      const name = this.updateProfileForm.value.name as string;
      const userId = await this.supabaseService.getUserId(); // Retrieve the user ID

      if (userId.id) {
        const { error } = await this.supabaseService.updateProfile({
          id: userId,
          first_name: firstname,
          name: name,
        });
        if (error) {
          throw error;
        }
        alert('Profile updated successfully!');
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

  async signOut() {
    await this.supabaseService.signOut();
  }
}
