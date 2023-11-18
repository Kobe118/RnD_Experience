import { Component, OnInit } from '@angular/core';
import {SupabaseService} from "../services/supabase.service";

@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.scss']
})
export class FamiliesComponent implements OnInit {
  currentUser: any;

  constructor(private readonly supabaseService: SupabaseService) {}

  async getCurrentUser() {
    try {
      const { data } = await this.supabaseService.supabase.auth.getUser();

      if (data) {
        this.currentUser = data.user;
        console.log('User ID:', this.currentUser.id);
        console.log('User Email:', this.currentUser.email);
      } else {
        console.log('No authenticated user');
      }
    } catch (error) {
      console.error('Error getting user:', error);
    }
  }

  async getFamilies() {
    let { data, error } = await this.supabaseService.supabase
        .rpc('get_all_users_family_members', {
          user_uuid:this.currentUser.id
        })
    if (error) console.error(error)
    else console.log(data)
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getFamilies();
  }
}