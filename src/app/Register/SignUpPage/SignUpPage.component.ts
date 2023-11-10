import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { SupabaseService} from "../../supabase.service";


@Component({
    selector: 'SignUpPage',
    templateUrl: './SignUpPage.component.html',
    styleUrls: ['./SignUpPage.component.css']
})
export class SignUpPageComponent {
    loading = false

    signInForm = this.formBuilder.group({
        email: '',
        password: '',
    })

    constructor(
        private readonly supabase: SupabaseService,
        private readonly formBuilder: FormBuilder
    ) {}

    async onSubmit(): Promise<void> {
        try {
            this.loading = true
            const email = this.signInForm.value.email as string
            const password = this.signInForm.value.password as string
            const { data, error } = await this.supabase.auth.signUp(
                {
                    email: email,
                    password: password,
                })
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            this.signInForm.reset()
            this.loading = false
        }
    }
}