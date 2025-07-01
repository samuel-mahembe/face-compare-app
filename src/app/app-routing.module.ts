import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AutoCaptureComponent} from './modules/face-detector/auto-capture/auto-capture.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/face-detector/face-detector.module').then(m => m.FaceDetectorModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
