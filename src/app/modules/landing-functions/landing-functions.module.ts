import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {RouterModule} from "@angular/router";
import {LandingFunctionsRoutingModule} from "./landing-functions.routing";



@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    LandingFunctionsRoutingModule
  ]
})
export class LandingFunctionsModule { }
