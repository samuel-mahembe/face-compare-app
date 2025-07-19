import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {FaceDetectorService} from "../../../services/face-detector.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{

  constructor(private router: Router,private faceDetectorService: FaceDetectorService ) {
  }

  ngOnInit(){
    console.log('We are loading');
    this.faceDetectorService.getHello().subscribe(res => {
      console.log(res);
    })
  }

  toCapture(){
    this.router.navigate(['/capture']);
  }

  toQuery() {
    this.router.navigate(['/query']);
  }
}
