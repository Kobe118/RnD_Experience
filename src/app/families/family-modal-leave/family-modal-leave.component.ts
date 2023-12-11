import { Component, OnInit } from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import {Family} from "../family.model";
import {User} from "../user.model";
@Component({
  selector: 'app-family-modal-leave',
  templateUrl: './family-modal-leave.component.html',
  styleUrls: ['./family-modal-leave.component.scss']
})
export class FamilyModalLeaveComponent implements OnInit{

  currentUser: User = {
    user_id: "",
    last_name: "",
    first_name: "",
    picture_url: ""
  };
  family: Family | null = null;

  constructor(private readonly supabaseService: SupabaseService, public modalRef: MdbModalRef<FamilyModalLeaveComponent>) {}

  ngOnInit() {

  }

  async deleteUser() {
    const { data, error } = await this.supabaseService.supabase
        .from('user_in_family')
        .delete()
        .eq('user', this.currentUser.user_id)
        .eq('family', this.family?.family_id);
    this.modalRef.close();

  }
}
