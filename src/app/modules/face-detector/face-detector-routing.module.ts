import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutoCaptureComponent } from './auto-capture/auto-capture.component';

const routes: Routes = [
  { path: '', component: AutoCaptureComponent }, // Default route points to FaceDetector
  { path: 'auto-capture', component: AutoCaptureComponent } // Keep AutoCapture as another route if needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaceDetectorRoutingModule {
}
