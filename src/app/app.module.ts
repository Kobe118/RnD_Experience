import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule
import { AppComponent } from './app.component';
import { RecipeComponent } from './recipe/recipe.component'; // Import RecipeComponent

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent
    // ... any other components in your app
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // Include it in the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
