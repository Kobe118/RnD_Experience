import {Component, Input, OnInit} from '@angular/core';
import {SupabaseService} from "../../services/supabase.service";
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

interface Recipe {
  recipe: string;
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
  @Input() day: string = "";
  @Input() family_id: string = "";
  @Input() mealplan_id: string = "";
  liked_recipes: Recipe[] = [];
  Nonliked_recipes: Recipe[] = [];
  combined_recipes: Recipe[] = [];
  modalRef: NgbModalRef | null = null;

  constructor(private supabaseService: SupabaseService, private modalService: NgbModal) {

  }

  async ngOnInit(): Promise<void> {
    console.log("family_id:", this.family_id)
    await this.supabaseService.GetLikedRecipes(this.getDate(this.day) ,this.family_id).then((data) => {
      this.liked_recipes = data[0] as Recipe[];
      console.log("liked", this.liked_recipes);
    });
    await this.supabaseService.GetNonLikedRecipes(this.getDate(this.day) ,this.family_id).then((data) => {
      this.Nonliked_recipes = data[0] as Recipe[];
      console.log("Nonliked", this.Nonliked_recipes);

    });
    if (this.liked_recipes == null) {
      this.combined_recipes = this.Nonliked_recipes;
    } else {
      this.combined_recipes = this.Nonliked_recipes.concat(this.liked_recipes);
    }
    console.log("combined:", this.combined_recipes)

  }

  selectRecipe(selectedRecipe: Recipe, recipes: Recipe[]): void {
    recipes.forEach(recipe => (recipe.isSelected = false));
    selectedRecipe.isSelected = true;
    console.log("SELECTED");
  }

  async submitSelection(recipes: Recipe[]): Promise<void> {
    if (this.combined_recipes.length === 0) {
      console.log('Recipes are not loaded yet');
      return;
    }
    const selectedRecipe = recipes.find(recipe => recipe.isSelected);
    if (selectedRecipe) {
      console.log("recipe_id:", selectedRecipe.recipe)
      console.log("recipe_id:", selectedRecipe)
      await this.supabaseService.AddToMealPlan(this.day ,this.mealplan_id, selectedRecipe.recipe).then((data) => {
        console.log(data.join());
      });
      console.log('Selected Recipe:', selectedRecipe);
    } else {
      console.log('No recipe selected');
    }
    this.closeModal();
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
  private getCurrentDate(): Date {
    return new Date();
  }

  private getDate(day: string): string {
    const int = +day - 1;
    const currentDate = new Date();
    const daysToMonday = (8 - currentDate.getDay()) % 7;
    const correctDay = new Date(currentDate.getTime() + daysToMonday * 24 * 60 * 60 * 1000 + int * 24 * 60 * 60 * 1000);
    console.log(correctDay);
    return correctDay.toISOString().split('T')[0];
  }


}

