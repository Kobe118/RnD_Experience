import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Recipe, PreferredRecipe, Family, User } from './home.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  preferredRecipes: PreferredRecipe[] = [];
  userFamilies: Family[] = [];
  urlUpcoming: string[] = [];
  urlPreferred: string[] = [];
  errorMessage?: string;

  constructor(private supabaseService: SupabaseService, private router: Router ) {}

  async ngOnInit() {
    try {
      const recipes = await this.supabaseService.getUpcomingRecipes();
      if (recipes) {
        this.recipes = recipes[0] as Recipe[];
        console.log('upcoming: ', this.recipes);
        this.loadImageUrls(this.recipes);
        console.log("Image URL for recipe_id:", this.urlUpcoming[1]);
      }
      const preferredRecipes = await this.supabaseService.getPreferredRecipes();
      if(preferredRecipes){
        this.preferredRecipes = preferredRecipes[0] as PreferredRecipe[];
        console.log('preferred: ', this.preferredRecipes);
        this.loadImagePreferredUrls(this.preferredRecipes);
      }
      this.getFamilies().then(() => {
        this.getImageUrl().then(() => {
        });
      });
    } catch (error) {
      console.error('Error fetching recipes:', error);
      this.errorMessage = 'Error fetching recipes';
    }
  }

  async loadImageUrls(recipes:Recipe[]) {
    for (const x in recipes) {
        this.urlUpcoming.push(await this.supabaseService.getImageUrl(recipes[x].recipe));
    }
  }

  async loadImagePreferredUrls(preferredRecipes:PreferredRecipe[]) {
    for (const x in preferredRecipes) {
        this.urlPreferred.push(await this.supabaseService.getImageUrl(preferredRecipes[x].recipe));
    }
  }
  async getFamilies() {
    const user = await this.supabaseService.getUserId();
    console.log('user id Family: ', user.id);
    let { data, error } = await this.supabaseService.supabase
        .rpc('get_all_users_family_members', {
          user_uuid: user.id
        });

    if (error) {
      console.error(error);
    } else {
      this.userFamilies = data.families as Family[];
      console.log(data);
      console.log(this.userFamilies)
    }

    await this.getImageUrl();
  }

  async getImageUrl() {
    for (const family of this.userFamilies) {
      for (const user of family.users) {
        try {
          const imageUrl = await this.supabaseService.getUserPictureUrl(`${user.user_id}.jpg`);
          user.picture_url = imageUrl;
        } catch (error) {
          user.picture_url = null;
        }
      }
    }
  }

  navigateToRecipeDetail(id: string) {
    this.router.navigate(['/recipe_detail', id]);
}

navigateToFamiliesPage() {
    this.router.navigate(['/families']);
}

  handleImageError(user: User) {
    user.picture_url = "\\assets\\default-user.jpg";
  }

}
