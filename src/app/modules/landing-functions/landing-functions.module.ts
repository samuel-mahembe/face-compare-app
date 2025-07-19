import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {RouterModule} from "@angular/router";
import {LandingFunctionsRoutingModule} from "./landing-functions.routing";
import { QueryPageComponent } from './query-page/query-page.component';



@NgModule({
  declarations: [
    LandingPageComponent,
    QueryPageComponent
  ],
  imports: [
    CommonModule,
    LandingFunctionsRoutingModule
  ]
})
export class LandingFunctionsModule { }
