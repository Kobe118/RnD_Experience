import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';

import { DefaultHeaderComponent } from './default-header/default-header.component';
import { FamiliesPageComponent } from './families-page/families-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { WelcomePageComponent } from './register/welcome-page/welcome-page.component';
import { DietaryPreferencePageComponent } from './register/dietary-preference-page/dietary-preference-page.component';
import { SignUpPageComponent } from './register/sign-up-page/sign-up-page.component';
import { CongratsPageComponent } from './register/congrats-page/congrats-page.component';
import { AllergiesPageComponent } from './register/allergies-page/allergies-page.component';
import { MealPlansHomeComponent } from './meal-plans/meal-plans-home/meal-plans-home.component';
import { MealPlansCalendarComponent } from './meal-plans/meal-plans-calendar/meal-plans-calendar.component';
import { RecipeComponent } from './recipe/recipe.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    DefaultHeaderComponent,
    FamiliesPageComponent,
    ProfilePageComponent,
    WelcomePageComponent,
    DietaryPreferencePageComponent,
    SignUpPageComponent,
    CongratsPageComponent,
    AllergiesPageComponent,
    MealPlansHomeComponent,
    MealPlansCalendarComponent,
    RecipeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
