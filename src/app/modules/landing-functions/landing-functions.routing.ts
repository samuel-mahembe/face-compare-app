import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {QueryPageComponent} from "./query-page/query-page.component";



const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {path: 'query',  component: QueryPageComponent}// Default route points to FaceDetector
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingFunctionsRoutingModule {
}
