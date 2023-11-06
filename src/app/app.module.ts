import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {WelcomePageComponent} from "./Register/WelcomePage/WelcomePage.component";
import {DietaryPreferencePageComponent} from "./Register/DietaryPreferencePage/DietaryPreferencePage.component";
import {AllergiesPageComponent} from "./Register/AllergiesPage/AllergiesPage.component";
import {SignUpPageComponent} from "./Register/SignUpPage/SignUpPage.component";
import {CongratsPageComponent} from "./Register/CongratsPage/CongratsPage.component";

@NgModule({
  declarations: [
    AppComponent,
      WelcomePageComponent,
      DietaryPreferencePageComponent,
      AllergiesPageComponent,
      SignUpPageComponent,
      CongratsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
