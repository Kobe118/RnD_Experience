import { SupabaseService } from "../services/supabase.service";
import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { Location } from "@angular/common";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    loading = false

    signInForm = this.formBuilder.group({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
    })

    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly formBuilder: FormBuilder,
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
                    options : {emailRedirectTo: "http://localhost:4200/register"},
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
    this.location.Location.subscribe(()=> {
        if (this.location.isCurrentPathEqualTo('/')) {
            this.stepper.selectedIndex = 2;
        }
    });
}
