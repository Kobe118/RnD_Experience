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

  constructor(private modalService: NgbModal, private supabaseService: SupabaseService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.days = Array.from({ length: 7 }, (_, index) => ({
      url: '',
      name: '',
      recipe: '',
      day_of_week: index + 1,
    }));

    const incomingdata = await this.supabaseService.getMealPlanInfo("55a0ea0f-7fc4-414b-bb35-5bb75f81195e");
    const data = incomingdata.flat();
    const dataArray = data as Day[];

    for (const dayFromSupabase of dataArray) {
      const dayIndex = dayFromSupabase.day_of_week - 1;
      this.days[dayIndex] = { ...this.days[dayIndex], ...dayFromSupabase };
    }
  }

  async openModal(day: number): Promise<void> {
    this.modalRef = this.modalService.open(ModalGeneratingComponent);
    this.modalRef.componentInstance.day = day;
    this.modalRef.componentInstance.modalRef = this.modalRef;
  }
}
