import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    constructor(private router: Router) {}

    readonly Main = '/app-root';
    readonly Login = '/login';
    readonly Welcome = '/welcome';
    readonly DietaryPreference = '/dietarypreference';
    readonly Congrats = '/congrats';
    readonly Allergies = '/allergies';
    readonly SignUp = '/signup';

    readonly Profile = '/profile';

    redirectToPage(route: string) {
        this.router.navigate([route]);
    }
    redirectToAllergiesPage() {
        this.router.navigate([this.Allergies]);
    }

    redirectToWelcomePage() {
        this.router.navigate([this.Welcome]);
    }

    redirectToDietaryPreferencePage() {
        this.router.navigate([this.DietaryPreference]);
    }

    redirectToSignUpPage() {
        this.router.navigate([this.SignUp]);
    }

    redirectToCongratsPage() {
        this.router.navigate([this.Congrats]);
    }

    redirectToProfilePage() {
        this.router.navigate([this.Profile]);
    }

}