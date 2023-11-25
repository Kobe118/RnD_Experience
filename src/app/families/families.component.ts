import { Component, OnInit } from '@angular/core';
import {SupabaseService} from "../services/supabase.service";
import { FamilyModalComponent } from "../family-modal/family-modal.component";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';


interface User {
  user_id: string;
  last_name: string;
  first_name: string;
  picture_url: string | null;
}
interface Family  {
  family_id: string;
  family_name: string;
  is_admin: boolean;
  users: User[];
}

@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.scss']
})

export class FamiliesComponent implements OnInit {
  currentUser: any = {};
  userFamilies: Family[] = [];
  imageurls: any[] = [];
  modalRef: MdbModalRef<FamilyModalComponent> | null = null;

  constructor(private readonly supabaseService: SupabaseService, private modalService: MdbModalService) {}

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
          //user_uuid: this.currentUser.id
          user_uuid: "afa97aa6-0c65-4db2-996e-2930ef3b9c1c"
        });

    if (error) {
      console.error(error);
    } else {
      this.userFamilies = data.families as Family[];
      console.log(data);
      console.log(this.userFamilies)
    }

    await this.getImageUrl();
  }

  async getImageUrl() {
    for (const family of this.userFamilies) {
      for (const user of family.users) {
        try {
          const imageUrl = await this.supabaseService.getUserPictureUrl(`${user.user_id}.jpg`);
          user.picture_url = imageUrl;
        } catch (error) {
          user.picture_url = null;
        }
      }
    }
  }

  ngOnInit() {
    this.getFamilies().then(() => {
      this.getImageUrl().then(() => {
      });
    });
  }

  openModal() {
    this.modalRef = this.modalService.open(FamilyModalComponent)
  }

  handleImageError(user: User) {
    user.picture_url = "\\assets\\default-user.jpg";
  }
}