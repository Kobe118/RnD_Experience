import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";
import { MealPlansHomeComponent } from './meal-plans/home/meal-plans-home.component';
import {HttpClientModule} from "@angular/common/http";
import {WelcomePageComponent} from "./Register/WelcomePage/WelcomePage.component";
import {DietaryPreferencePageComponent} from "./Register/DietaryPreferencePage/DietaryPreferencePage.component";
import {AllergiesPageComponent} from "./Register/AllergiesPage/AllergiesPage.component";
import {SignUpPageComponent} from "./Register/SignUpPage/SignUpPage.component";
import {CongratsPageComponent} from "./Register/CongratsPage/CongratsPage.component";
import {AccountComponent} from "./Register/account/account.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModalGeneratingComponent } from './meal-plans/modal-generating/modal-generating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        MealPlansHomeComponent,
        WelcomePageComponent,
        DietaryPreferencePageComponent,
        AllergiesPageComponent,
        SignUpPageComponent,
        CongratsPageComponent,
        AccountComponent,
        ModalGeneratingComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        NgOptimizedImage,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgbModule,
    ],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
