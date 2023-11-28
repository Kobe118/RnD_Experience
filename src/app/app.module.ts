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
import { FamilyModalComponent } from './family-modal/family-modal.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { FamilyModalAddComponent } from './family-modal-add/family-modal-add.component';

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
    FamilyModalComponent,
    FamilyModalAddComponent,
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
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }