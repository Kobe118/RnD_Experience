import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    constructor(private router: Router) {}

    readonly Main = '/app-root';
    readonly Login = '/LogIn';
    readonly WelcomePage = '/WelcomePage';
    readonly DietaryPreferencePage = '/DietaryPreferencePage';
    readonly CongratsPage = '/CongratsPage';
    readonly AllergiesPage = '/AllergiesPage';
    readonly SignUpPage = '/SignUpPage';

    readonly ProfilePage = '/profile';

    redirectToPage(route: string) {
        this.router.navigate([route]);
    }
    redirectToAllergiesPage() {
        this.router.navigate([this.AllergiesPage]);
    }

    redirectToWelcomePage() {
        this.router.navigate([this.WelcomePage]);
    }

    redirectToDietaryPreferencePage() {
        this.router.navigate([this.DietaryPreferencePage]);
    }

    redirectToSignUpPage() {
        this.router.navigate([this.SignUpPage]);
    }

    redirectToCongratsPage() {
        this.router.navigate([this.CongratsPage]);
    }

    redirectToProfilePage() {
        this.router.navigate([this.ProfilePage]);
    }

}