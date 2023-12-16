import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckinComponent } from './checkin/checkin.component';
import { LuckydrawComponent } from './luckydraw/luckydraw.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service'

@NgModule({
  declarations: [
    AppComponent,
    CheckinComponent,
    LuckydrawComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
