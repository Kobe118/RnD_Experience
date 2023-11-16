import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {WelcomePageComponent} from "./Register/WelcomePage/WelcomePage.component";
import {DietaryPreferencePageComponent} from "./Register/DietaryPreferencePage/DietaryPreferencePage.component";
import {AllergiesPageComponent} from "./Register/AllergiesPage/AllergiesPage.component";
import {SignUpPageComponent} from "./Register/SignUpPage/SignUpPage.component";
import {CongratsPageComponent} from "./Register/CongratsPage/CongratsPage.component";
import {AccountComponent} from "./Register/account/account.component";
import {DefaultHeaderComponent} from "./default-header/default-header.component";
import {FamiliesPageComponent} from "./families-page/families-page.component";
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
      WelcomePageComponent,
      DietaryPreferencePageComponent,
      AllergiesPageComponent,
      SignUpPageComponent,
      CongratsPageComponent,
      AccountComponent,
      DefaultHeaderComponent,
      FamiliesPageComponent,
      ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
     CommonModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
