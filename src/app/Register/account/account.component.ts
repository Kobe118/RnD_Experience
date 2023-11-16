import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { AuthSession } from '@supabase/supabase-js'
import { Profile, SupabaseService} from "../../supabase.service";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
    loading = false
    profile!: Profile

    @Input()
    session!: AuthSession

    updateProfileForm = this.formBuilder.group({
        lastname: '',
        firstname: '',
    })

    constructor(private readonly supabaseService: SupabaseService, private formBuilder: FormBuilder) {}

    async ngOnInit(): Promise<void> {
        await this.getProfile()

        const { name, first_name } = this.profile
        this.updateProfileForm.patchValue({
            lastname: name,
            firstname: first_name,
        })
    }

    async getProfile() {
        try {
            this.loading = true
            const { user } = this.session
            const { data: profile, error, status } = await this.supabaseService.profile(user)

            if (error && status !== 406) {
                throw error
            }

            if (profile) {
                this.profile = profile
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            this.loading = false
        }
    }

    async updateProfile(): Promise<void> {
        try {
            this.loading = true
            const { user } = this.session

            const lastname = this.updateProfileForm.value.lastname as string
            const firstname = this.updateProfileForm.value.firstname as string

            const { error } = await this.supabaseService.updateProfile({
                id: user.id,
                name: lastname,
                first_name: firstname,
            })
            if (error) throw error
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            this.loading = false
        }
    }

    async signOut() {
        await this.supabaseService.signOut()
    }
}