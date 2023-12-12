import { Component, OnInit } from '@angular/core';
import {SupabaseService} from "../services/supabase.service";
import { FamilyModalComponent } from "./family-modal/family-modal.component";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {User} from "./user.model";
import {Family} from "./family.model";
import {FamilyModalAddComponent} from "./family-modal-add/family-modal-add.component";
import {FamilyModalLeaveComponent} from "./family-modal-leave/family-modal-leave.component";
import {FamilyCreateModalComponent} from "./family-create-modal/family-create-modal.component";
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
  modalleaveRef: MdbModalRef<FamilyModalLeaveComponent> | null = null;
  modalcreateRef: MdbModalRef<FamilyCreateModalComponent> | null = null;



  constructor(private readonly supabaseService: SupabaseService, private modalService: MdbModalService) {}


  async getFamilies() {
    const user = await this.supabaseService.getUserId();
    if (user) {
      this.currentUser.user_id = user.id;
    }

    let { data, error } = await this.supabaseService.supabase
        .rpc('get_all_users_family_members', {
          user_uuid: user.id
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

    this.modalRef.onClose.subscribe(() => {
      this.ngOnInit();
    });
  }

  openModalAdd(family: Family) {
    this.modaladdRef = this.modalService.open(FamilyModalAddComponent, {
      data: { currentUser: this.currentUser, family: family, title: "Add member to " + family.family_name,  searchuser: true},
    });

    this.modaladdRef.onClose.subscribe(() => {
      this.ngOnInit();
    });
  }

  openModalJoin() {
    this.modaladdRef = this.modalService.open(FamilyModalAddComponent, {
      data: { currentUser: this.currentUser, family: null, title: "Search a family to join" , searchuser: false},
    });

    this.modaladdRef.onClose.subscribe(() => {
      this.ngOnInit();
    });
  }

  openModalLeave(family: Family) {
    this.modalleaveRef = this.modalService.open(FamilyModalLeaveComponent, {
      data: { currentUser: this.currentUser, family: family },
    });
    this.modalleaveRef.onClose.subscribe(() => {
      this.ngOnInit();
    });
  }

  openModalCreate() {
    this.modalcreateRef = this.modalService.open(FamilyCreateModalComponent, {
      data: { currentUser: this.currentUser },
    });
    this.modalcreateRef.onClose.subscribe(() => {
      this.ngOnInit();
    });
  }

  handleImageError(user: User) {
    user.picture_url = "\\assets\\default-user.jpg";
  }
}