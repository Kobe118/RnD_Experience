import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { FamiliesPageComponent } from './families-page/families-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultHeaderComponent,
    FamiliesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
