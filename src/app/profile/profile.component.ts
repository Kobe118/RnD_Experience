import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router

  ) {}
  logout() {
    this.supabaseService.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }
}
