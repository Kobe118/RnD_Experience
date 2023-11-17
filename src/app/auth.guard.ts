import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from './supabase.service'; // Import your authentication service

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private supabaseService: SupabaseService, private router: Router) {}

    canActivate(): boolean {
        const session = this.supabaseService.session; // Get the authentication session

        if (session) {
            // User is authenticated, allow access to the route
            return true;
        } else {
            // User is not authenticated, redirect to the login page or any desired route
            this.router.navigate(['/login']); // Replace '/login' with your login page path
            return false;
        }
    }
}
