import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LogInComponent} from "./LogIn/LogIn.component";
import {WelcomePageComponent} from "./Register/WelcomePage/WelcomePage.component";
import {DietaryPreferencePageComponent} from "./Register/DietaryPreferencePage/DietaryPreferencePage.component";
import {SignUpPageComponent} from "./Register/SignUpPage/SignUpPage.component";
import {CongratsPageComponent} from "./Register/CongratsPage/CongratsPage.component";
import {AllergiesPageComponent} from "./Register/AllergiesPage/AllergiesPage.component";
import {FamiliesPageComponent} from "./families-page/families-page.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";

const routes: Routes = [
  { path: '', component: WelcomePageComponent }, //lookup guards
  { path: 'LogIn', component: LogInComponent },
  { path: 'WelcomePage', component: WelcomePageComponent },
  { path: 'DietaryPreferencePage', component: DietaryPreferencePageComponent },
  { path: 'AllergiesPage', component: AllergiesPageComponent },
  { path: 'SignUpPage', component: SignUpPageComponent },
  { path: 'CongratsPage', component: CongratsPageComponent },
  { path: 'families', component: FamiliesPageComponent },
  { path: 'profile', component: ProfilePageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
