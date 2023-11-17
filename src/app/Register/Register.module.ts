import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRoutingModule} from "./Register-routing.module";

import { WelcomePageComponent } from './WelcomePage/WelcomePage.component';
import { DietaryPreferencePageComponent } from './DietaryPreferencePage/DietaryPreferencePage.component';
import { AllergiesPageComponent } from './AllergiesPage/AllergiesPage.component';
import { SignUpPageComponent } from './SignUpPage/SignUpPage.component';
import { CongratsPageComponent } from './CongratsPage/CongratsPage.component';
import { AccountComponent } from './account/account.component';

@NgModule({
    declarations: [
        WelcomePageComponent,
        DietaryPreferencePageComponent,
        AllergiesPageComponent,
        SignUpPageComponent,
        CongratsPageComponent,
        AccountComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RegisterRoutingModule,
    ],
})
export class RegisterModule {}
