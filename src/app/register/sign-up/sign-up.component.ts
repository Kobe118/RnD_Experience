import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { SupabaseService} from "../../supabase.service";


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
    loading = false

    signInForm = this.formBuilder.group({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
    })

    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly formBuilder: FormBuilder
    ) {}

    async onSubmit(): Promise<void> {
        try {
            this.loading = true
            const email = this.signInForm.value.email as string
            const password = this.signInForm.value.password as string
            const lastname = this.signInForm.value.lastname as string
            const firstname = this.signInForm.value.firstname as string
            const { data, error } = await this.supabaseService.supabase.auth.signUp(
                {
                    email: email,
                    password: password,
                })
            console.log(data.user)
            console.log(error)
            if (error) throw error
            alert('Check your email for the login link!')
            const uuid = data.user?.id
            await this.supabaseService.supabase.from('users').insert([{id:uuid, name:lastname, first_name: firstname}])
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