import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { NgOptimizedImage } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { MealPlansHomeComponent } from './meal-plans/home/meal-plans-home.component';
import { ModalGeneratingComponent } from './meal-plans/modal-generating/modal-generating.component';
import { RecipeComponent } from './recipe/recipe.component';
import { HomeComponent } from './home/home.component';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FamiliesComponent } from './families/families.component';
import { ProfileComponent } from './profile/profile.component';
import { FamilyModalComponent } from './families/family-modal/family-modal.component';
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
import { FamilyModalAddComponent } from './families/family-modal-add/family-modal-add.component';
import { FamilyModalLeaveComponent } from './families/family-modal-leave/family-modal-leave.component';
import { FamilyCreateModalComponent } from './families/family-create-modal/family-create-modal.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { RegisterComponent } from './register/register.component';
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

    RegisterComponent,
    FamilyModalComponent,
    FamilyModalAddComponent,
    FamilyModalLeaveComponent,
    FamilyCreateModalComponent,
    GroceryListComponent,
    RegisterComponent,
    RecipeDetailComponent,
    ModalGeneratingComponent,
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

    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
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