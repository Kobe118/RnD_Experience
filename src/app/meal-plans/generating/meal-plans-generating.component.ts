import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ModalGeneratingComponent} from "../modal-generating/modal-generating.component";
import {SupabaseService} from "../../services/supabase.service";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {HttpClient} from "@angular/common/http";
import {Router, ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";


interface Day {
  url: string;
  name: string;
  recipe: string;
  day_of_the_week: number;
}
@Component({
  selector: 'app-meal-plans-generating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-plans-generating.component.html',
  styleUrls: ['./meal-plans-generating.component.scss']
})
export class MealPlansGeneratingComponent {
  days: Day[] = [];
  modalRef: NgbModalRef | null = null;
  constructor(private modalService: NgbModal, private supabaseService: SupabaseService, private route: ActivatedRoute) {
  }
  async ngOnInit(): Promise<void> {
    /*const id = this.route.snapshot.params['mealplan'];
    console.log(id);*/
    this.days = Array.from({ length: 7 }, (_, index) => ({
      url: '',
      name: '',
      recipe: '',
      day_of_the_week: index + 1,
    }));
    const data = await this.supabaseService.getMealPlanInfo("55a0ea0f-7fc4-414b-bb35-5bb75f81195e");
    console.log(data);

    for (const dayFromSupabase of data) {
      const index = (dayFromSupabase as Day).day_of_the_week - 1;
      this.days[index] = { ...this.days[index], ...(dayFromSupabase as Day) };
    }
    console.log(this.days);
  }
  openModal(day: number) {
    this.modalRef = this.modalService.open(ModalGeneratingComponent);
    this.modalRef.componentInstance.day = day;
    this.modalRef.componentInstance.modalRef = this.modalRef;
  }

}