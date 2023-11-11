import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent} from './app.component';
import {LogInComponent} from "./LogIn/LogIn.component";
import {MealPlansHomeComponent} from "./meal-plans/home/meal-plans-home.component"; // Update with the correct path to my-page.component

const routes: Routes = [
  { path: '', component: AppComponent }, // Use the correct component for the root path
  { path: 'LogIn', component: LogInComponent }, // Use the correct component for the second path
  { path: 'MealPlansHome', component: MealPlansHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
