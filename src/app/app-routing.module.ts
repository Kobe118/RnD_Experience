import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent} from './app.component';
import {LogInComponent} from "./LogIn/LogIn.component";
import {MealPlansHomeComponent} from "./meal-plans/home/meal-plans-home.component";
import {MealPlansCalenderComponent} from "./meal-plans/calender/meal-plans-calender.component";
import {MealPlansGeneratingComponent} from "./meal-plans/generating/meal-plans-generating.component";

const routes: Routes = [
  { path: '', component: AppComponent }, // Use the correct component for the root path
  { path: 'LogIn', component: LogInComponent }, // Use the correct component for the second path
  { path: 'MealPlansHome', component: MealPlansHomeComponent },
  { path: 'MealPlansCalender', component: MealPlansCalenderComponent },
  { path: 'MealPlansGenerate', component: MealPlansGeneratingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
