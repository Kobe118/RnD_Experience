import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';

import { DefaultHeaderComponent } from './default-header/default-header.component';
import { MealPlansHomeComponent } from './meal-plans/meal-plans-home/meal-plans-home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { HomeComponent } from './home/home.component';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FamiliesComponent } from './families/families.component';
import { ProfileComponent } from './profile/profile.component';
import { WelcomeComponent } from './register/welcome/welcome.component';
import { SignUpComponent } from './register/sign-up/sign-up.component';
import { DietaryPreferenceComponent } from './register/dietary-preference/dietary-preference.component';
import { CongratsComponent } from './register/congrats/congrats.component';
import { AllergiesComponent } from './register/allergies/allergies.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DefaultHeaderComponent,
    MealPlansHomeComponent,
    RecipeComponent,
    HomeComponent,
    BottomNavigationComponent,
    FamiliesComponent,
    ProfileComponent,
    WelcomeComponent,
    SignUpComponent,
    DietaryPreferenceComponent,
    CongratsComponent,
    AllergiesComponent,
    RecipeDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    NgOptimizedImage,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }