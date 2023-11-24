import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogInComponent } from "./log-in/log-in.component";
import { WelcomeComponent } from "./register/welcome/welcome.component";
import { DietaryPreferenceComponent}  from "./register/dietary-preference/dietary-preference.component";
import { SignUpComponent } from "./register/sign-up/sign-up.component";
import { CongratsComponent } from "./register/congrats/congrats.component";
import { AllergiesComponent } from "./register/allergies/allergies.component";
import { FamiliesComponent } from "./families/families.component";
import { ProfileComponent } from "./profile/profile.component";
import { MealPlansHomeComponent } from "./meal-plans/meal-plans-home/meal-plans-home.component";
import { MealPlansCalendarComponent }  from "./meal-plans/meal-plans-calendar/meal-plans-calendar.component";
import { RecipeComponent } from './recipe/recipe.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard';


const routes: Routes = [
  { path: 'login', component: LogInComponent, },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'dietarypreference', component: DietaryPreferenceComponent, canActivate: [ AuthGuard] },
  { path: 'allergies', component: AllergiesComponent, canActivate: [ AuthGuard] },
  { path: 'signup', component: SignUpComponent },
  { path: 'congrats', component: CongratsComponent, canActivate: [ AuthGuard] },
  { path: 'families', component: FamiliesComponent, canActivate: [ AuthGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: 'mealplanshome', component: MealPlansHomeComponent, canActivate: [ AuthGuard] },
  { path: 'mealplanscalendar', component: MealPlansCalendarComponent, canActivate: [ AuthGuard] },
  { path: 'recipe', component: RecipeComponent, canActivate: [ AuthGuard] },
  { path: 'Home', component: HomeComponent, canActivate: [ AuthGuard] },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' ,pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
