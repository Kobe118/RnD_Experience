import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogInComponent } from "./log-in/log-in.component";
import { WelcomePageComponent } from "./register/welcome-page/welcome-page.component";
import { DietaryPreferencePageComponent}  from "./register/dietary-preference-page/dietary-preference-page.component";
import { SignUpPageComponent } from "./register/sign-up-page/sign-up-page.component";
import { CongratsPageComponent } from "./register/congrats-page/congrats-page.component";
import { AllergiesPageComponent } from "./register/allergies-page/allergies-page.component";
import { FamiliesPageComponent } from "./families-page/families-page.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { MealPlansHomeComponent } from "./meal-plans/meal-plans-home/meal-plans-home.component";
import { MealPlansCalendarComponent }  from "./meal-plans/meal-plans-calendar/meal-plans-calendar.component";
import { RecipeComponent } from './recipe/recipe.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'dietarypreference', component: DietaryPreferencePageComponent },
  { path: 'allergies', component: AllergiesPageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'congrats', component: CongratsPageComponent },
  { path: 'families', component: FamiliesPageComponent },
  { path: 'profile', component: ProfilePageComponent},
  { path: 'mealplanshome', component: MealPlansHomeComponent },
  { path: 'mealplanscalendar', component: MealPlansCalendarComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: 'Home', component: HomeComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' ,pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
