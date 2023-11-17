import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent} from './app.component';
import {LogInComponent} from "./LogIn/LogIn.component";
import {MealPlansHomeComponent} from "./meal-plans/home/meal-plans-home.component";
import {MealPlansCalenderComponent} from "./meal-plans/calender/meal-plans-calender.component";
import {MealPlansGeneratingComponent} from "./meal-plans/generating/meal-plans-generating.component";
import {WelcomePageComponent} from "./Register/WelcomePage/WelcomePage.component";
import {DietaryPreferencePageComponent} from "./Register/DietaryPreferencePage/DietaryPreferencePage.component";
import {SignUpPageComponent} from "./Register/SignUpPage/SignUpPage.component";
import {CongratsPageComponent} from "./Register/CongratsPage/CongratsPage.component";
import {AllergiesPageComponent} from "./Register/AllergiesPage/AllergiesPage.component";

const routes: Routes = [
  { path: '', component: AppComponent }, // Use the correct component for the root path
  { path: 'LogIn', component: LogInComponent }, // Use the correct component for the second path
  { path: 'MealPlansHome', component: MealPlansHomeComponent },
  { path: 'MealPlansCalender', component: MealPlansCalenderComponent },
  { path: 'MealPlansGenerate', component: MealPlansGeneratingComponent },

  { path: '', component: WelcomePageComponent }, //lookup guards
  { path: 'LogIn', component: LogInComponent },
  { path: 'WelcomePage', component: WelcomePageComponent },
  { path: 'DietaryPreferencePage', component: DietaryPreferencePageComponent },
  { path: 'AllergiesPage', component: AllergiesPageComponent },
  { path: 'SignUpPage', component: SignUpPageComponent },
  { path: 'CongratsPage', component: CongratsPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
