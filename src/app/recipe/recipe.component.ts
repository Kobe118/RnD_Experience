// recipe.component.ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-recipe',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
    isHeartFilled = false;

    toggleHeart(): void {
        this.isHeartFilled = !this.isHeartFilled;
    }
    isThumbsDown = false; // Property to hold the state of thumbs down

    // Method to toggle thumbs down
    toggleThumbsDown(): void {
        this.isThumbsDown = !this.isThumbsDown;
    }
}
