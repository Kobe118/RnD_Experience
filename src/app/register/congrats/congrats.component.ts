import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-congrats',
    templateUrl: './congrats.component.html',
    styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent {
    constructor(private router: Router) {} // Inject the service

    navigateToHome() {
        this.router.navigate(['Home']);
    }
}