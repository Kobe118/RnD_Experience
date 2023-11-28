import { Component, OnInit } from '@angular/core';
import {SupabaseService} from "../services/supabase.service";
import { FamilyModalComponent } from "../family-modal/family-modal.component";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {User} from "./user.model";
import {Family} from "./Family.model";
import {FamilyModalAddComponent} from "../family-modal-add/family-modal-add.component";





@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.scss']
})

export class FamiliesComponent implements OnInit {
  currentUser: User = {
    user_id: "",
    last_name: "",
    first_name: "",
    picture_url: ""
  };
  userFamilies: Family[] = [];
  modalRef: MdbModalRef<FamilyModalComponent> | null = null;
  modaladdRef: MdbModalRef<FamilyModalAddComponent> | null = null;
  constructor(private readonly supabaseService: SupabaseService, private modalService: MdbModalService) {}

  async getCurrentUser() {
    try {
      const { data } = await this.supabaseService.supabase.auth.getUser();

      if (data.user) {
        this.currentUser = {
          user_id: data.user.id,
          last_name: "",
          first_name:  "",
          picture_url: "" // You can set a default picture URL here if needed
        };
      } else {
        console.log('No authenticated user');
      }
    } catch (error) {
      console.error('Error getting user:', error);
    }
  }

  async getFamilies() {
    await this.getCurrentUser();
    console.log(this.currentUser.user_id);

    let { data, error } = await this.supabaseService.supabase
        .rpc('get_all_users_family_members', {
          user_uuid: this.currentUser.user_id
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

  openModal(family: Family) {
    this.modalRef = this.modalService.open(FamilyModalComponent, {
      data: { currentUser: this.currentUser, family: family },
    });
  }

  openModalAdd(family: Family) {
    this.modaladdRef = this.modalService.open(FamilyModalAddComponent, {
      data: { currentUser: this.currentUser, family: family },
    });
  }

  handleImageError(user: User) {
    user.picture_url = "\\assets\\default-user.jpg";
  }
}