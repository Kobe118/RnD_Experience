import {Component, OnInit} from '@angular/core';
import {User} from "../families/user.model";
import {Family} from "../families/Family.model";
import {SupabaseService} from "../services/supabase.service";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-family-modal-form',
  templateUrl: './family-modal-add.component.html',
  styleUrls: ['./family-modal-add.component.scss']
})
export class FamilyModalAddComponent implements OnInit{
  currentUser: User = {
    user_id: "",
    last_name: "",
    first_name: "",
    picture_url: ""
  };
  family: Family | null = null;
  userForm = this.fb.group({
    userId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_-]+')]],});
  constructor(private readonly supabaseService: SupabaseService, public modalRef: MdbModalRef<FamilyModalAddComponent>
  , private fb: FormBuilder) {}
  ngOnInit() {

  }

  async onSubmit() {
    if (this.userForm.valid) {
      const userId = this.userForm.get('userId')?.value;

      if (userId) {
        console.log('User id submitted:', userId);
        const { data, error } = await this.supabaseService.supabase
            .from('user_in_family')
            .insert([
              { user: userId, family: this.family?.family_id },
            ])
            .select()
      }

    }
    this.modalRef.close();
  }
}

