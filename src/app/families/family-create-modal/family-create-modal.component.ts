import {Component, OnInit} from '@angular/core';
import {User} from "../user.model";
import {Family} from "../family.model";
import {SupabaseService} from "../../services/supabase.service";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-family-create-modal',
  templateUrl: './family-create-modal.component.html',
  styleUrls: ['./family-create-modal.component.scss']
})
export class FamilyCreateModalComponent implements OnInit {
  currentUser: User = {
    user_id: "",
    last_name: "",
    first_name: "",
    picture_url: ""
  };

  family: Family = {
    is_admin: true,
    family_id: "",
    family_name: "",
    users: [this.currentUser]
  };

  familyForm = this.fb.group({
    familyName: ['', [Validators.required]]
  });

  constructor(private readonly supabaseService: SupabaseService, public modalRef: MdbModalRef<FamilyCreateModalComponent>
      , private fb: FormBuilder) {}
  ngOnInit() {

  }

  async onSubmitFamilyForm() {
    if (this.familyForm.valid) {
      const familyName = this.familyForm.get('familyName')?.value;

      if (familyName) {
        const {data, error} = await this.supabaseService.supabase
            .from('families')
            .insert([{family_name: familyName}])
            .select();

        if (error) {
          console.error('Error inserting family:', error.message);
        } else if (data && data.length > 0) {

          this.family.family_id = data[0].id;
          this.family.family_name = data[0].family_name;

          const { error: userInFamilyError } = await this.supabaseService.supabase
              .from('user_in_family')
              .insert([
                {
                  user: this.currentUser.user_id,
                  family: this.family.family_id,
                  is_admin: true
                }
              ]);

          if (userInFamilyError) {
            console.error('Error inserting user_in_family record:', userInFamilyError);
          } else {
            console.log('User_in_family record inserted successfully.');
          }
        }

      }
    }
    this.modalRef.close();
  }
}
