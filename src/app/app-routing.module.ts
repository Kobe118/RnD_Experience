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


const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'dietarypreference', component: DietaryPreferenceComponent },
  { path: 'allergies', component: AllergiesComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'congrats', component: CongratsComponent },
  { path: 'families', component: FamiliesComponent },
  { path: 'profile', component: ProfileComponent},
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
