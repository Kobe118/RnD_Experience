import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalGeneratingComponent} from "../modal-generating/modal-generating.component";
import {SupabaseService} from "../../supabase.service";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";

@Component({
  selector: 'app-meal-plans-generating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-plans-generating.component.html',
  styleUrls: ['./meal-plans-generating.component.scss']
})
export class MealPlansGeneratingComponent {
  weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  modalRef: NgbModalRef | null = null;
  constructor(private modalService: NgbModal, private supabaseService: SupabaseService) {
  }
  openModal(day: string) {
    this.modalRef = this.modalService.open(ModalGeneratingComponent);
    this.modalRef.componentInstance.day = day;
    this.modalRef.componentInstance.modalRef = this.modalRef;
  }
}
