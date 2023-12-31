import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from "./log-in/log-in.component";
import { RegisterComponent } from "./register/register.component";
import { AllergiesComponent } from './register/allergies/allergies.component';
import { FamiliesComponent } from "./families/families.component";
import { ProfileComponent } from "./profile/profile.component";
import { MealPlansHomeComponent } from "./meal-plans/home/meal-plans-home.component";
import { MealPlansCalendarComponent }  from "./meal-plans/calendar/meal-plans-calendar.component";
import { MealPlansGeneratingComponent} from "./meal-plans/generating/meal-plans-generating.component";
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailComponent } from "./recipe/recipe-detail/recipe-detail.component";
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard';
import { DietaryPreferenceComponent } from "./register/dietary-preference/dietary-preference.component";
import { CongratsComponent } from "./register/congrats/congrats.component";
 
const routes: Routes = [
  { path: 'login', component: LogInComponent, },
  { path: 'register', component: RegisterComponent },
  { path: 'allergies', component: AllergiesComponent, canActivate: [ AuthGuard] },
  { path: 'dietaryPreference', component: DietaryPreferenceComponent, canActivate: [ AuthGuard] },
  { path: 'congrats', component: CongratsComponent, canActivate: [ AuthGuard] },
  { path: 'families', component: FamiliesComponent, canActivate: [ AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard] },
  { path: 'mealplanshome', component: MealPlansHomeComponent, canActivate: [ AuthGuard] },
  { path: 'mealplanscalendar', component: MealPlansCalendarComponent, canActivate: [ AuthGuard] },
  { path: 'mealplansgenerating', component: MealPlansGeneratingComponent, canActivate: [ AuthGuard] },
  { path: 'grocerylist', component: GroceryListComponent, canActivate: [ AuthGuard] },
  { path: 'recipe', component: RecipeComponent, canActivate: [ AuthGuard] },
  { path: 'recipe_detail/:id', component:RecipeDetailComponent, canActivate: [ AuthGuard]},
  { path: 'Home', component: HomeComponent, canActivate: [ AuthGuard] },
  { path: '', redirectTo: '/Home'},
  { path: '*', redirectTo: '/Home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
