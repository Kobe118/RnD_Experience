import { Component, OnInit } from '@angular/core';
import {SupabaseService} from "../services/supabase.service";

@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.scss']
})
export class FamiliesComponent implements OnInit {
  currentUser: any = {};
  userFamilies: any[] = [];
  imageurls: any[] = [];

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
    await this.getCurrentUser();

    let { data, error } = await this.supabaseService.supabase
        .rpc('get_all_users_family_members', {
          user_uuid: this.currentUser.id
          //user_uuid: "afa97aa6-0c65-4db2-996e-2930ef3b9c1c"
        });

    if (error) {
      console.error(error);
    } else {
      this.userFamilies = data;
      console.log(data);
    }
  }

  async getImageUrl() {
    for (let i=1; i<6;i++) {
      this.imageurls.push(await this.supabaseService.getUserPictureUrl('test_user_' + i + '.jpg'));
    }
  }

  ngOnInit() {
    this.getFamilies().then(r => {});
    this.getImageUrl().then(r => {});
  }
}