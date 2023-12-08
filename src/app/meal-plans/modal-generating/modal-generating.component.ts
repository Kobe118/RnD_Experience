import {Component, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
interface Recipe {
  recipe_id: string;
  name: string;
  url: string;
  isSelected: boolean;

}
@Component({
  selector: 'app-modal-generating',
  templateUrl: './modal-generating.component.html',
  styleUrls: ['./modal-generating.component.scss']
})
export class ModalGeneratingComponent implements OnInit {
  day: string | null = null;
  liked_recipes: Recipe[] = [];
  Nonliked_recipes: Recipe[] = [];
  combined_recipes: Recipe[] = [];
  modalRef: NgbModalRef | null = null;

  constructor(private supabaseService: SupabaseService, private modalService: NgbModal) {}

  async ngOnInit(): Promise<void> {
    await this.supabaseService.GetLikedRecipes('2023-11-20' ,'244f4431-3c7b-4e43-9bcd-93d93422e3ef').then((data) => {
      this.liked_recipes = data[0] as Recipe[];
    });
    await this.supabaseService.GetNonLikedRecipes('2023-11-20' ,'244f4431-3c7b-4e43-9bcd-93d93422e3ef').then((data) => {
      this.Nonliked_recipes = data[0] as Recipe[];
    });
    this.combined_recipes = this.liked_recipes.concat(this.Nonliked_recipes);

  }

  selectRecipe(selectedRecipe: Recipe, recipes: Recipe[]): void {
    recipes.forEach(recipe => (recipe.isSelected = false));
    selectedRecipe.isSelected = true;
  }

  async submitSelection(recipes: Recipe[]): Promise<void> {
    const selectedRecipe = recipes.find(recipe => recipe.isSelected);
    if (selectedRecipe) {
      await this.supabaseService.AddToMealPlan('1','55a0ea0f-7fc4-414b-bb35-5bb75f81195e', '6f5e78b1-4ac7-47e7-b095-4d57b5338176').then((data) => {
        console.log(data.join());
      });
      console.log('Selected Recipe:', selectedRecipe);
    } else {
      console.log('No recipe selected');
    }
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
  private getCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }
}

