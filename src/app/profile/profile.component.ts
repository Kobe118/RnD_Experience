import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Profile, SupabaseService } from '../supabase.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    loading = false;
    profile!: Profile;
    userId: string | undefined;

    updateProfileForm = this.formBuilder.group({
        lastname: '',
        firstname: '',
    });

    constructor(
        private readonly supabaseService: SupabaseService,
        private formBuilder: FormBuilder
    ) {}

    async ngOnInit(): Promise<void> {
        try {
            this.loading = true;
            this.userId = await this.supabaseService.getUserId();

            if (!this.userId) {
                throw new Error('User ID not available');
            }

            const { data: profile, error, status } = await this.supabaseService.profile(this.userId);

            if (error && status !== 406) {
                throw error;
            }

            if (profile) {
                this.profile = profile;
                this.updateProfileForm.patchValue({
                    lastname: profile.name,
                    firstname: profile.first_name,
                });
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
            const lastname = this.updateProfileForm.value.lastname as string;
            const firstname = this.updateProfileForm.value.firstname as string;

            const updatedProfile: Profile = {
                id: this.userId,
                name: lastname,
                first_name: firstname,
            };

            await this.supabaseService.updateProfile(updatedProfile);

            // Optionally, update the local profile data after a successful update
            this.profile = updatedProfile;
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
