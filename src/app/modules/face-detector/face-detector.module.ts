import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCaptureComponent } from './auto-capture/auto-capture.component';
import {FaceDetectorRoutingModule} from "./face-detector-routing.module";



@NgModule({
  declarations: [
    AutoCaptureComponent
  ],
  imports: [
    CommonModule,
    FaceDetectorRoutingModule
  ]
})
export class FaceDetectorModule { }
