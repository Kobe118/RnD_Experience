// meal-plans-generating.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalGeneratingComponent } from "../modal-generating/modal-generating.component";
import { SupabaseService } from "../../services/supabase.service";
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { delay } from "rxjs";

interface Recipe {
  recipe_id: string;
  name: string;
  url: string;
  isSelected: boolean;
}

interface Day {
  url: string;
  name: string;
  recipe: string;
  day_of_week: number;
}

@Component({
  selector: 'app-meal-plans-generating',
  templateUrl: './meal-plans-generating.component.html',
  styleUrls: ['./meal-plans-generating.component.scss']
})
export class MealPlansGeneratingComponent implements OnInit {
  days: Day[] = [];
  modalRef: NgbModalRef | null = null;
  family_id: String = "";
  mealplan_id: String = "";


  constructor(private router: Router, private modalService: NgbModal, private supabaseService: SupabaseService, private route: ActivatedRoute) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.family_id = state?.['family_id'];
    this.mealplan_id = state?.['mealplan_id'];
    console.log('family_id and mealplan:', this.family_id, this.mealplan_id);
  }

  async ngOnInit(): Promise<void> {
    this.days = Array.from({ length: 7 }, (_, index) => ({
      url: '',
      name: '',
      recipe: '',
      day_of_week: index + 1,
    }));

    const incomingdata = await this.supabaseService.getMealPlanInfo(this.mealplan_id);
    const data = incomingdata.flat();
    const dataArray = data as Day[];

    for (const dayFromSupabase of dataArray) {
      const dayIndex = dayFromSupabase.day_of_week - 1;
      this.days[dayIndex] = { ...this.days[dayIndex], ...dayFromSupabase };
    }
  }

  async openModal(day: number): Promise<void> {
    console.log("familyId:", this.family_id);
    this.modalRef = this.modalService.open(ModalGeneratingComponent);
    this.modalRef.componentInstance.day = day.toString();
    this.modalRef.componentInstance.modalRef = this.modalRef;
    this.modalRef.componentInstance.family_id = this.family_id;
    this.modalRef.componentInstance.mealplan_id = this.mealplan_id;
  }

  goBack(): void {
    this.router.navigate(['/mealplanshome']);
  }
}
