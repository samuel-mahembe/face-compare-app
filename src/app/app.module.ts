import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FaceDetectorModule} from "./modules/face-detector/face-detector.module";
import {HttpClientModule} from "@angular/common/http";
import {LandingFunctionsModule} from "./modules/landing-functions/landing-functions.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FaceDetectorModule,
    HttpClientModule,
    LandingFunctionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
