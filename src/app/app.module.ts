import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RecipeComponent } from './recipe/recipe.component'; // Import RecipeComponent
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent
  ],
  imports: [
      CommonModule,
      BrowserModule,
      HttpClientModule,
      AppRoutingModule // Include it in the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
