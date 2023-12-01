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
      // this allows the user to access the page if they are logged in
      return true;
    } else {
      this.router.navigateByUrl('login'); // this redirects the user to the login page if they are not logged in
      return false;
    }
  }
}