import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import {Family} from "../families/Family.model";
import {User} from "../families/user.model";

@Component({
  selector: 'app-family-modal',
  templateUrl: './family-modal.component.html',
  styleUrls: ['./family-modal.component.scss']
})
export class FamilyModalComponent implements OnInit{
  currentUser: User = {
    user_id: "",
    last_name: "",
    first_name: "",
    picture_url: ""
  };
  family: Family | null = null;
  selectedUserIds: string[] = [];
  constructor(public modalRef: MdbModalRef<FamilyModalComponent>) {}
  ngOnInit() {

  }

  handleImageError(user: User) {
    user.picture_url = "\\assets\\default-user.jpg";
  }

  selectUser(userId: string) {
    if(this.selectedUserIds.includes(userId)) {
      this.selectedUserIds.splice(this.selectedUserIds.indexOf(userId), 1);
    } else {
      this.selectedUserIds.push(userId);
    }
    console.log('Selected user ID:', this.selectedUserIds);

  }
}
