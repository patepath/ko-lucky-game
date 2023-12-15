import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckinComponent } from './checkin/checkin.component';
import { LuckydrawComponent } from './luckydraw/luckydraw.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckinComponent,
    LuckydrawComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
