import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SupabaseService } from './services/supabase.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.supabaseService.isLoggedIn()) {
      // User is logged in, allow access
      return true;
    } else {
      // User is not logged in, check if trying to access login or sign-up page
      const currentUrl = this.router.url;
      if (currentUrl === '/tabs/list-login' || currentUrl === '/tabs/list-signup') {
        // Allow access to login or sign-up page if the user is not logged in
        return true;
      } else {
        // Redirect to the login page for other routes
        this.router.navigateByUrl('/tabs/list-login');
        return false;
      }
    }
  }
}