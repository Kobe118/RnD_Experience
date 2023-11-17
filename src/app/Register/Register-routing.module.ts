import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {WelcomePageComponent} from "./WelcomePage/WelcomePage.component";
import {DietaryPreferencePageComponent} from "./DietaryPreferencePage/DietaryPreferencePage.component";
import {SignUpPageComponent} from "./SignUpPage/SignUpPage.component";
import {CongratsPageComponent} from "./CongratsPage/CongratsPage.component";
import {AllergiesPageComponent} from "./AllergiesPage/AllergiesPage.component";
import { AuthGuard} from "../auth.guard";

const routes: Routes = [
    { path: '', component: WelcomePageComponent }, //lookup guards
    { path: 'WelcomePage', component: WelcomePageComponent },
    { path: 'DietaryPreferencePage', component: DietaryPreferencePageComponent },
    { path: 'AllergiesPage', component: AllergiesPageComponent },
    { path: 'SignUpPage', component: SignUpPageComponent },
    { path: 'CongratsPage', component: CongratsPageComponent },

    {
        path: 'protected',
        canActivate: [AuthGuard],
       // loadChildren: () =>
        //    import('./protected/protected.module').then((m) => m.ProtectedModule),
        // the code above is to load lazy
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RegisterRoutingModule { }
