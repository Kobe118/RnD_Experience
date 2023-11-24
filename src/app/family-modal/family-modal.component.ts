import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-family-modal',
  templateUrl: './family-modal.component.html',
  styleUrls: ['./family-modal.component.scss']
})
export class FamilyModalComponent {
  constructor(public modalRef: MdbModalRef<FamilyModalComponent>) {}
}
