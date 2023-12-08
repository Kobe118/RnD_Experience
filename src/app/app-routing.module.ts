import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from "./log-in/log-in.component";
import { RegisterComponent } from "./register/register.component";
import { FamiliesComponent } from "./families/families.component";
import { ProfileComponent } from "./profile/profile.component";
import { MealPlansHomeComponent } from "./meal-plans/home/meal-plans-home.component";
import { MealPlansCalendarComponent }  from "./meal-plans/calendar/meal-plans-calendar.component";
import { MealPlansGeneratingComponent} from "./meal-plans/generating/meal-plans-generating.component";
import { RecipeComponent } from './recipe/recipe.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard';
import { RecipeDetailComponent } from "./recipe/recipe-detail/recipe-detail.component";
 
const routes: Routes = [
  { path: 'login', component: LogInComponent, },
  { path: 'register', component: RegisterComponent },
  { path: 'families', component: FamiliesComponent, canActivate: [ AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard] },
  { path: 'mealplanshome', component: MealPlansHomeComponent, canActivate: [ AuthGuard] },
  { path: 'mealplanscalendar', component: MealPlansCalendarComponent, canActivate: [ AuthGuard] },
  { path: 'mealplansgenerating', component: MealPlansGeneratingComponent, canActivate: [ AuthGuard] },
  { path: 'recipe', component: RecipeComponent, canActivate: [ AuthGuard] },
  { path: 'recipe_detail', component:RecipeDetailComponent, canActivate: [ AuthGuard]},
  { path: 'Home', component: HomeComponent, canActivate: [ AuthGuard] },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' ,pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
